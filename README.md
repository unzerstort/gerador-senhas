# gerador-senhas
Gerador de senhas feito para o processo seletivo de Pessoa Desenvolvedora Front-End da Alura.

## Estratégias de Desenvolvimento
### CSS

Pensando em escrever CSS com alto grau de abstração, reutilização e composição de classes CSS, optei por utilizar uma estratégia híbrida.
As classes que não exigem media queries e que podem ser facilmente compostas, como `bg-dark-violet` e `border`, seguem a metodologia utility-first. 
Isso maximiza a reutilização e minimiza a complexidade do código. Para outras estruturas que demandam maior controle e adaptação a diferentes tamanhos de tela, utilizei classes nomeadas de forma convencional, com as modificações necessárias aplicadas via media queries.
