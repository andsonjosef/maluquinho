export interface CompraDTO {
    id: number,
    idCliente: number,
    dataCompra: Date,
    status: boolean,
    pagamento: boolean,
    primeiraParcela: Date,
    qtdParcelas: number,
    total: number,
}
