var Pessoa = /** @class */ (function () {
    function Pessoa(nome, email) {
        this.nome = nome;
        this.email = email;
    }
    return Pessoa;
}());
var cliente = new Pessoa("Seu nome", "Seu e-mail");
console.log(cliente.nome);
console.log(cliente.email);
