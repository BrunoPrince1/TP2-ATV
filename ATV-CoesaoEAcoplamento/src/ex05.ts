class AutenticacaoDeUsuario {
    public usuarios: Map<string, string>;

    constructor() {
        // Inicializa o Map vazio
        this.usuarios = new Map<string, string>();
    }

    public registrarUsuario(usuario: string, senha: string): void {
        // .set(chave, valor) adiciona ou atualiza um item no Map
        this.usuarios.set(usuario, senha);
        console.log(`Usuário "${usuario}" registrado.`);
    }

    public autenticarUsuario(usuario: string, senha: string): boolean {
        // .get(chave) recupera o valor associado à chave
        const senhaArmazenada = this.usuarios.get(usuario);

        // Verificamos se a senha existe e se é igual à fornecida
        if (senhaArmazenada === senha) {
            return true;
        }
        return false;
    }
}

// --- TESTE ---

const autenticacao = new AutenticacaoDeUsuario();

autenticacao.registrarUsuario("ana", "senha");
autenticacao.registrarUsuario("lucas", "senha2");

const usuarioAutenticado = autenticacao.autenticarUsuario("ana", "senha");

if (usuarioAutenticado) {
    console.log("Usuário autenticado com sucesso!");
} else {
    console.log("Falha na autenticação do Usuário!");
}

// Teste extra: Tentar logar com senha errada
const testeFalha = autenticacao.autenticarUsuario("ana", "senhaErrada");
if (testeFalha) {
    console.log("Ana logada (Erro de lógica)");
} else {
    console.log("Falha proposital na autenticação de Ana (Senha incorreta).");
}