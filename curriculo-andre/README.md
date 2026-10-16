# André Marques — Currículo & portfólio
Site estático pessoal em português, com apresentação em formato de infográfico e foco em automação, inteligência artificial aplicada e dados.

## Conteúdo e interação
- Perfil e atuação em serviços digitais B2B.
- Mapa de competências sem notas ou percentuais de proficiência arbitrários.
- Seis cases: Mirai, SheetForge, Amanda, Oráculo, ATP Radar e Prompt Bench.
- Filtros por área, detalhes dos cases, navegação por seção, contato via WhatsApp e cópia de telefone.
- Layout responsivo, navegação por teclado, preferência de movimento reduzido e CSS próprio para impressão/PDF.
- O conteúdo principal permanece legível com JavaScript desativado.
- Sem dependências, API de IA, rastreadores ou captura de dados de visitantes.

## Execução
Sirva esta pasta por qualquer servidor HTTP estático. Exemplo:

```bash
python -m http.server 8080 --directory curriculo-andre
```

No Vercel: diretório raiz `curriculo-andre`, preset **Other**, sem comandos de instalação/build, diretório de saída `.`.
A configuração `vercel.json` aplica cabeçalhos de segurança e bloqueia indexação durante o teste.

## Retrato profissional
A foto original autorizada pelo titular está em `assets/andre-marques.jpg` e é apresentada diretamente no HTML, inclusive quando o JavaScript está desativado.
O arquivo foi preservado sem transformação; o enquadramento responsivo é aplicado apenas pelo CSS.

## Edição e evidências
O HTML contém o currículo completo. O CSS e o JavaScript ficam em arquivos separados.
Informações usadas: trajetória e formações informadas pelo titular, além de README dos repositórios SheetForge, MiraiProject, amanda_secretaria e Prompt-Bench consultados em 15/10/2026.
As tecnologias indicadas descrevem os projetos; não equivalem a senioridade nem certificação individual em cada tecnologia.
Não são apresentados resultados percentuais, anos de experiência anteriores a 2022, clientes ou títulos de cursos não confirmados.
A pós-graduação é descrita por sua área de estudo, sem afirmar conclusão ou data.
Os nomes individuais e as datas das duas certificações Cisco precisam ser acrescentados quando os comprovantes estiverem disponíveis.

## Escopo do repositório
Este módulo é independente do gerador de portfólios existente na raiz. O currículo e os dados de contato foram publicados a pedido expresso do titular.
A apresentação do empregador limita-se a cargo e descrição geral da atuação; não há bases operacionais, dados de clientes, código corporativo, credenciais ou documentação interna neste módulo.
