// 1. Classe Contato (A dependência)
class Contato {
    constructor(
        public nome: string,
        public telefone: string,
        public email: string
    ) { }
}

// 2. Classe Agenda (O dependente)
class Agenda {
    public contatos: Contato[];

    constructor() {
        this.contatos = [];
    }

    // Método para adicionar
    public adicionarContato(contato: Contato): void {
        this.contatos.push(contato);
        console.log(`Contato adicionado: ${contato.nome}`);
    }

    // Método para remover (recebe o objeto do contato)
    public removerContato(contatoParaRemover: Contato): void {
        // Encontra o índice do objeto específico dentro do array
        const index = this.contatos.indexOf(contatoParaRemover);

        if (index > -1) {
            this.contatos.splice(index, 1);
            console.log(`Contato removido: ${contatoParaRemover.nome}`);
        } else {
            console.log("Contato não encontrado na agenda.");
        }
    }

    public listarContatos(): void {
        console.log("\n--- Lista de Contatos ---");
        if (this.contatos.length === 0) {
            console.log("Agenda vazia.");
        } else {
            this.contatos.forEach((c, i) => {
                console.log(`${i + 1}. ${c.nome} | Tel: ${c.telefone} | Email: ${c.email}`);
            });
        }
        console.log("-------------------------\n");
    }
}

// --- TESTE ---

const minhaAgenda = new Agenda();

// Criando objetos de contato
const contato1 = new Contato("Alisson", "(11) 99999-1111", "alisson@email.com");
const contato2 = new Contato("Maria", "(21) 98888-2222", "maria@email.com");
const contato3 = new Contato("João", "(31) 97777-3333", "joao@email.com");

// 1. Adicionando contatos
minhaAgenda.adicionarContato(contato1);
minhaAgenda.adicionarContato(contato2);
minhaAgenda.adicionarContato(contato3);

// Mostra como ficou
minhaAgenda.listarContatos();

// 2. Removendo um contato (o contato2 - Maria)
minhaAgenda.removerContato(contato2);

// 3. Tentando remover um contato que já foi removido (teste de erro)
minhaAgenda.removerContato(contato2);

// Mostra lista final
minhaAgenda.listarContatos();