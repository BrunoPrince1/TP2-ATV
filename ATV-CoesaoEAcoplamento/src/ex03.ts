// 1. Classe Item (Necessária para o carrinho funcionar)
class Item {
    constructor(
        public nome: string,
        public preco: number,
        public quantidade: number
    ) {}
}

// 2. Classe Carrinho (Com lógica de cálculo acoplada ao Item)
class Carrinho {
    private itens: Item[];

    constructor() {
        this.itens = [];
    }

    public adicionarItem(item: Item): void {
        this.itens.push(item);
    }

    public calcularTotal(): number {
        let total = 0;
        for (const item of this.itens) {
            total += (item.preco * item.quantidade);
        }
        return total;
    }
}

// 3. Classe Pagamento
class Pagamento {
    public processarPagamento(total: number, forma: string): void {
        console.log(`Pagamento de R$ ${total.toFixed(2)} em ${forma}, processado com sucesso!`);
    }
}

// --- TESTE ---

const carrinhoc = new Carrinho();

// Adicionando Camiseta (50 * 2 = 100)
let item = new Item("Camiseta", 50, 2);
carrinhoc.adicionarItem(item);

// Adicionando Calça (130 * 1 = 130)
item = new Item("Calça", 130, 1);
carrinhoc.adicionarItem(item);

// Adicionando Meia (20 * 3 = 60)
item = new Item("Meia", 20, 3);
carrinhoc.adicionarItem(item);

const total = carrinhoc.calcularTotal();

console.log("Total calculado:", total);

const pagamento = new Pagamento();
pagamento.processarPagamento(total, "dinheiro");