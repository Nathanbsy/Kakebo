interface OFXTransaction {
  id: string;
  data: Date;
  quantia: number;
  descricao: string;
  tipo: "Receita" | "Despesa";
  metodo: string;
}

/**
 * Parse um arquivo OFX e extrai as transações
 * OFX é um formato de arquivo de banco que contém transações
 */
export function parseOFX(conteudoArquivo: string): OFXTransaction[] {
  const transacoes: OFXTransaction[] = [];

  // Remove espaços em branco extras e quebras de linha
  const conteudo = conteudoArquivo.replace(/[\r\n]+/g, "");

  // Encontra todas as transações no formato <STMTTRN>...</STMTTRN>
  const regexTransacao = /<STMTTRN>(.*?)<\/STMTTRN>/g;
  let match;

  while ((match = regexTransacao.exec(conteudo)) !== null) {
    const blocoTransacao = match[1];

    try {
      // Extrai cada campo da transação
      const trntype = extrairCampo(blocoTransacao, "TRNTYPE");
      const dtposted = extrairCampo(blocoTransacao, "DTPOSTED");
      const trnamt = extrairCampo(blocoTransacao, "TRNAMT");
      const fitid = extrairCampo(blocoTransacao, "FITID");
      const name = extrairCampo(blocoTransacao, "NAME");
      const memo = extrairCampo(blocoTransacao, "MEMO");

      // Valida dados obrigatórios
      if (!dtposted || !trnamt || !fitid) {
        console.warn("Transação incompleta ignorada:", blocoTransacao);
        continue;
      }

      // Converte data de YYYYMMDD para Date
      const data = converterDataOFX(dtposted);
      if (!data) {
        console.warn("Data inválida:", dtposted);
        continue;
      }

      // Converte valor (pode vir como string com virgula)
      const valor = parseFloat(trnamt.replace(",", "."));
      if (isNaN(valor)) {
        console.warn("Valor inválido:", trnamt);
        continue;
      }

      // Determina se é receita ou despesa baseado no tipo ou sinal
      const tipo = valor > 0 || trntype === "CREDIT" ? "Receita" : "Despesa";
      const quantia = Math.abs(valor);

      // Monta descrição a partir do nome e memo
      const descricao = [name, memo].filter(Boolean).join(" - ");

      transacoes.push({
        id: fitid,
        data,
        quantia,
        descricao,
        tipo,
        metodo: "transferência_bancária", // OFX é sempre transferência bancária
      });
    } catch (erro) {
      console.error("Erro ao processar transação:", erro);
    }
  }

  return transacoes;
}

/**
 * Extrai um campo específico de um bloco OFX
 * Procura por <CAMPO>valor</CAMPO> ou <CAMPO>valor
 */
function extrairCampo(bloco: string, nomeCampo: string): string | null {
  // Tenta formato: <CAMPO>valor</CAMPO>
  const regex1 = new RegExp(`<${nomeCampo}>(.*?)<\/${nomeCampo}>`);
  const match1 = regex1.exec(bloco);
  if (match1) {
    return match1[1].trim();
  }

  // Tenta formato: <CAMPO>valor com nova tag depois
  const regex2 = new RegExp(`<${nomeCampo}>([^<]*)`);
  const match2 = regex2.exec(bloco);
  if (match2) {
    return match2[1].trim();
  }

  return null;
}

/**
 * Converte data no formato OFX (YYYYMMDD) para Date
 */
function converterDataOFX(dataStr: string): Date | null {
  if (!dataStr || dataStr.length < 8) {
    return null;
  }

  try {
    const ano = parseInt(dataStr.substring(0, 4));
    const mes = parseInt(dataStr.substring(4, 6));
    const dia = parseInt(dataStr.substring(6, 8));

    // Validação básica
    if (mes < 1 || mes > 12 || dia < 1 || dia > 31) {
      return null;
    }

    return new Date(ano, mes - 1, dia); // mês é 0-indexed no JS
  } catch {
    return null;
  }
}

/**
 * Valida se um arquivo é um OFX válido
 */
export function ehArquivoOFXValido(conteudo: string): boolean {
  return (
    conteudo.includes("OFXHEADER") &&
    (conteudo.includes("<STMTTRN>") || conteudo.includes("<stmttrn>"))
  );
}
