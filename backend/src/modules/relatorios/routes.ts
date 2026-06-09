import { Router, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { authMiddleware } from "../../shared/utils/middleware";
import { stringify } from "csv-stringify/sync";

const prisma = new PrismaClient();
const router = Router();

// GET /api/relatorios/mensal
router.get("/mensal", authMiddleware, async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    
    // Validar se userId existe
    if (!userId) {
      return res.status(401).json({ success: false, error: "Unauthorized" });
    }

    const { ano = new Date().getFullYear(), mes = new Date().getMonth() + 1 } = req.query;

    const startDate = new Date(Number(ano), Number(mes) - 1, 1);
    const endDate = new Date(Number(ano), Number(mes), 0, 23, 59, 59);

    // Get movimentacoes
    const movimentacoes = await prisma.movimentacao.findMany({
      where: {
        userId,
        data: {
          gte: startDate,
          lte: endDate,
        },
      },
      include: { categoria: true },
    });

    // Calculate totals
    const receita = movimentacoes
      .filter((t) => t.tipo === "receita")
      .reduce((sum, t) => sum + Number(t.quantia), 0);

    const despesa = movimentacoes
      .filter((t) => t.tipo === "despesa")
      .reduce((sum, t) => sum + Number(t.quantia), 0);

    // Group by categoria com tipos corretos
    const porCategoria = movimentacoes.reduce(
      (acc, t) => {
        const cat = t.categoria.nome;
        if (!acc[cat]) {
          acc[cat] = { total: 0, tipo: t.tipo, movimentacoes: [] };
        }
        acc[cat].total += Number(t.quantia);
        acc[cat].movimentacoes.push(t);
        return acc;
      },
      {} as Record<string, { total: number; tipo: string; movimentacoes: typeof movimentacoes }>
    );

    return res.json({
      success: true,
      data: {
        period: `${ano}-${String(mes).padStart(2, "0")}`,
        summary: {
          receita,
          despesa,
          saldo: receita - despesa,
        },
        porCategoria,
        movimentacoes,
      },
    });
  } catch (error) {
    return res.status(500).json({ success: false, error: "Internal server error" });
  }
});

// GET /api/relatorios/anual
router.get("/anual", authMiddleware, async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    
    // Validar se userId existe
    if (!userId) {
      return res.status(401).json({ success: false, error: "Unauthorized" });
    }

    const { ano = new Date().getFullYear() } = req.query;

    const startDate = new Date(Number(ano), 0, 1);
    const endDate = new Date(Number(ano), 11, 31, 23, 59, 59);

    const movimentacoes = await prisma.movimentacao.findMany({
      where: {
        userId,
        data: {
          gte: startDate,
          lte: endDate,
        },
      },
      include: { categoria: true },
    });

    // Calculate totals
    const receita = movimentacoes
      .filter((t) => t.tipo === "receita")
      .reduce((sum, t) => sum + Number(t.quantia), 0);

    const despesa = movimentacoes
      .filter((t) => t.tipo === "despesa")
      .reduce((sum, t) => sum + Number(t.quantia), 0);

    // agrupamento por mes
    const porMes = Array(12)
      .fill(null)
      .reduce(
        (acc, _, i) => {
          const mes = String(i + 1).padStart(2, "0");
          acc[mes] = {
            receita: 0,
            despesa: 0,
            saldo: 0,
          };
          return acc;
        },
        {} as Record<string, { receita: number; despesa: number; saldo: number }>
      );

    movimentacoes.forEach((t) => {
      const mes = String(t.data.getMonth() + 1).padStart(2, "0");
      if (t.tipo === "receita") {
        porMes[mes].receita += Number(t.quantia);
      } else {
        porMes[mes].despesa += Number(t.quantia);
      }
      porMes[mes].saldo = porMes[mes].receita - porMes[mes].despesa;
    });

    return res.json({
      success: true,
      data: {
        ano,
        summary: {
          receita,
          despesa,
          saldo: receita - despesa,
        },
        porMes,
      },
    });
  } catch (error) {
    return res.status(500).json({ success: false, error: "Internal server error" });
  }
});

// GET /api/relatorios/exportar
router.get("/exportar", authMiddleware, async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    
    // Validar se userId existe
    if (!userId) {
      return res.status(401).json({ success: false, error: "Unauthorized" });
    }

    const { dataInicio, dataFim, sepadadoPor } = req.query;

    // Validar datas
    if (!dataInicio || !dataFim) {
      return res.status(400).json({ success: false, error: "Data inicial e final são obrigatórias" });
    }

    const startDate = new Date(String(dataInicio));
    const endDate = new Date(String(dataFim));

    // Validar se as datas são válidas
    if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
      return res.status(400).json({ success: false, error: "Datas inválidas" });
    }

    // Buscar movimentações
    const movimentacoes = await prisma.movimentacao.findMany({
      where: {
        userId,
        data: {
          gte: startDate,
          lte: new Date(endDate.getTime() + 86400000), // Adiciona 1 dia para incluir o dia final
        },
      },
      include: { categoria: true },
      orderBy: { data: "asc" },
    });

    // Preparar dados para CSV
    const records = movimentacoes.map((m) => ({
      Data: m.data.toLocaleDateString("pt-BR"),
      Categoria: m.categoria.nome,
      Descrição: m.descricao,
      Tipo: m.tipo === "receita" ? "Receita" : "Despesa",
      Valor: m.quantia.toString().replace(".", ","),
    }));

    // Gerar CSV
    const csv = stringify(records, {
      header: true,
      columns: ["Data", "Categoria", "Descrição", "Tipo", "Valor"],
    });

    // Calcular resumo
    const totalReceita = movimentacoes
      .filter((m) => m.tipo === "receita")
      .reduce((sum, m) => sum + Number(m.quantia), 0);

    const totalDespesa = movimentacoes
      .filter((m) => m.tipo === "despesa")
      .reduce((sum, m) => sum + Number(m.quantia), 0);

    const saldo = totalReceita - totalDespesa;

    // Adicionar resumo no final
    const resumoLines = [
      "",
      "RESUMO",
      `Total Receita,${totalReceita.toString().replace(".", ",")}`,
      `Total Despesa,${totalDespesa.toString().replace(".", ",")}`,
      `Saldo,${saldo.toString().replace(".", ",")}`,
    ];

    const csvFinal = csv + resumoLines.join("\n");

    // Configurar headers para download
    const fileName = `relatorio_${String(dataInicio).replace(/\//g, "-")}_${String(dataFim).replace(/\//g, "-")}.csv`;
    res.setHeader("Content-Type", "text/csv; charset=utf-8");
    res.setHeader("Content-Disposition", `attachment; filename="${fileName}"`);

    return res.send(csvFinal);
  } catch (error) {
    return res.status(500).json({ success: false, error: "Internal server error" });
  }
});

export const relatoriosRouter = router;
