class CarrinhoDeCompras {
    // Atributo privado array de strings
    private itens: string[];

    constructor() {
        // Inicializa o array vazio
        this.itens = [];
    }

    public adicionarItem(item: string): void {
        this.itens.push(item);
        // Opcional: Feedback visual
        // console.log(`${item} adicionado ao carrinho.`);
    }

    public removerItem(item: string): void {
        // Encontra o índice do item na lista
        const index = this.itens.indexOf(item);

        // Se encontrou (index > -1), remove o item
        if (index > -1) {
            this.itens.splice(index, 1);
            // console.log(`${item} removido do carrinho.`);
        } else {
            console.log(`Item "${item}" não encontrado.`);
        }
    }

    public imprimir(): void {
        console.log("--- Itens no Carrinho ---");
        // Mostra a lista ou uma mensagem se estiver vazio
        if (this.itens.length > 0) {
            console.log(this.itens.join(", "));
        } else {
            console.log("O carrinho está vazio.");
        }
        console.log("-------------------------");
    }
}

// --- TESTE ---

const carrinho = new CarrinhoDeCompras();
carrinho.adicionarItem("Camiseta");
carrinho.adicionarItem("Calça");
carrinho.adicionarItem("Meia");
carrinho.removerItem("Camiseta");

// Ajuste: Chamamos direto, pois o método já faz o console.log internamente
carrinho.imprimir();