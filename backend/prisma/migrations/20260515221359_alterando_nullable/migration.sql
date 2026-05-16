-- AlterTable
ALTER TABLE `categorias` MODIFY `dataAtualizacao` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `historico_reflexoes` MODIFY `dataAtualizacao` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `movimentacoes` MODIFY `data` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    MODIFY `dataAtualizacao` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `relatorios` MODIFY `dataAtualizacao` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `usuarios` MODIFY `dataAtualizacao` DATETIME(3) NULL;
