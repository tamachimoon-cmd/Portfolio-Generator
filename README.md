# Portfolio Generator

Projeto #008 do **LAB//ABERTO**: gerador de portfólios estáticos a partir de arquivos JSON ou YAML.

## Recursos

- Editor e upload de JSON/YAML.
- Validação de campos obrigatórios.
- Prévia responsiva em tempo real.
- Tema claro ou escuro.
- Seções de perfil, habilidades, projetos e links.
- Sanitização de texto e validação de protocolos de links.
- Exportação ZIP com `index.html`, `styles.css` e instruções.
- API local sem persistência.
- Testes automatizados, Docker e GitHub Actions.

## Executar

Requer Node.js 20+.

```bash
npm install
npm start
```

Abra `http://localhost:3000`.

## Testar

```bash
npm run check
npm test
```

## Docker

```bash
docker compose up --build
```

## Exemplo mínimo

```json
{
  "theme": "dark",
  "profile": {
    "name": "Seu Nome",
    "headline": "Desenvolvedor e Designer",
    "bio": "Descrição curta",
    "location": "Brasil"
  },
  "skills": ["JavaScript", "Python"],
  "projects": [
    {"name":"Projeto","description":"Descrição","url":"https://github.com/","stack":["Node.js"]}
  ]
}
```

YAML usa a mesma estrutura.

## Privacidade

Nenhuma configuração é persistida pela aplicação. O conteúdo é usado apenas para gerar a prévia ou o arquivo ZIP durante a requisição.

## Independência

Projeto pessoal e independente. Não representa nem reutiliza código, dados, processos ou propriedade intelectual de empregadores ou clientes.

## Licença

MIT.
