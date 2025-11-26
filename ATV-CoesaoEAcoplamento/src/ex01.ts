// 1. Classe ContaBancaria
class ContaBancaria {
    private saldo: number;

    constructor() {
        this.saldo = 0;
    }

    // Método depositar (+)
    public depositar(valor: number): void {
        this.saldo += valor;
        console.log(`[Depósito] R$ ${valor.toFixed(2)} realizado com sucesso.`);
        this.exibirSaldo();
    }

    // Método sacar (+) com validação
    public sacar(valor: number): void {
        // Garante que o saldo não fique negativo
        if (valor > this.saldo) {
            console.log(`[Erro] Tentativa de saque de R$ ${valor.toFixed(2)} negada. Saldo insuficiente.`);
        } else {
            this.saldo -= valor;
            console.log(`[Saque] R$ ${valor.toFixed(2)} realizado com sucesso.`);
        }
        this.exibirSaldo();
    }

    // Método auxiliar para visualizar o saldo atual
    public exibirSaldo(): void {
        console.log(`Saldo Atual: R$ ${this.saldo.toFixed(2)}\n`);
    }
}

// 2. Classe Cliente
class Cliente {
    private nome: string;
    private cpf: string;
    private nasc: Date;
    private nomemae: string;
    private conta: ContaBancaria;

    constructor(nome: string, cpf: string, nasc: Date, nomemae: string, conta: ContaBancaria) {
        this.nome = nome;
        this.cpf = cpf;
        this.nasc = nasc;
        this.nomemae = nomemae;
        this.conta = conta;
    }

    // Getter para acessar a conta (necessário para operar "via cliente")
    public getConta(): ContaBancaria {
        return this.conta;
    }
}

// --- EXERCICIOS ---

// 1. Instancie um objeto da classe ContaBancaria
const minhaConta = new ContaBancaria();

// 2. Instancie um objeto da classe Cliente
const meuCliente = new Cliente(
    "Bruno Prince",           // nome
    "111.222.333-00",           // cpf
    new Date("1997-05-29"),     // nasc (Formato Date)
    "Maria",                 // nomemae
    minhaConta                  // conta (objeto criado anteriormente)
);

console.log("--- Início das Operações ---\n");

// 3. Faça um depósito de R$ 100,00 via conta do cliente
// Acessamos a conta através do método getConta() do cliente
meuCliente.getConta().depositar(100);

// 4. Faça um saque de R$ 50,00 via conta do cliente
meuCliente.getConta().sacar(50);

// 5. Tente fazer um saque de R$ 60,00 via conta do cliente
// Isso deve falhar pois o saldo atual será 50
meuCliente.getConta().sacar(60);