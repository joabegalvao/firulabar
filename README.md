# Firula Restaurante e Bar

Landing page de uma página para o Firula, bar e restaurante com shows ao vivo na Zona 04 de Maringá PR. Site estático (HTML, CSS e JavaScript puros), sem build, sem dependências em tempo de execução. Abra `index.html` ou sirva a pasta com qualquer servidor estático.

## Dados do cliente

| Campo | Valor |
| --- | --- |
| Nome | Firula Restaurante e Bar (no Google: Firula Bar) |
| Segmento | Bar e restaurante: comidas, bebidas e shows ao vivo |
| Público | Homens e mulheres |
| WhatsApp | (44) 99736-5555, `https://wa.me/5544997365555` |
| Instagram | [@firulabar](https://www.instagram.com/firulabar/) |
| Endereço | Av. Curitiba, 289, Zona 04, Maringá PR, CEP 87014-130 |
| Nota no Google | 4,6 (2.479 avaliações em 02/10/2026) |
| Telefone fixo, e-mail, horário | Não informados (o site manda confirmar horário e programação pelo WhatsApp ou Instagram) |

Frases fornecidas no briefing, todas usadas: "Almoço caseiro de verdade", "Pratos executivos todos os dias", "Comida saborosa e feita na hora", "Faça sua reserva ou tire dúvidas".

### Avaliações (texto original, sem edição)

- **Fernando Todão**: "Ambiente maravilhoso, equipe preparada, comida de boteco perfeita. Lugar ótimo para ir com os amigos ou com a família"
- **Gabriela Meneguetti**: "O Firula é meu bar preferido em Maringá. Moro em Blumenau/SC e minha família mora aqui, então toda vez que venho é de lei ir ao Firula."
- **Gabriele Guimarães**: "Eu amo as bebidas doces do Firula, são as únicas que eu realmente consigo e gosto de tomar!"

No site, a avaliação da Gabriela aparece com "Blumenau" em vez de "Blumenau/SC" (cabe melhor na bolacha redonda; o sentido é o mesmo). O trecho da Gabriele é citado também no quadro "Boteco e drinks". Não vieram fotos de perfil, por isso as avaliações mostram só o nome.

### Conferência no Google (02/10/2026)

Pesquisa "Firula Bar Maringá" no Google Maps: nome **Firula Bar**, Av. Curitiba, 289, Zona 04, Maringá, CEP 87014-130, nota **4,6 em 2.479 avaliações**. A nota bate com o briefing, por isso ela e a quantidade ("mais de 2.400 avaliações") aparecem no site e no `aggregateRating` dos dados estruturados. O mapa incorporado é carregado pelo nome do estabelecimento e mostra a ficha com a nota.

## Direção visual

Pedido: tema de pub meio americano, muito caprichado, "sai um pouco do padrão", dono exigente.

- **Cores do logo**: preto `#0d0b0a` (fundo das seções escuras), laranja `#fe6603` (botões, palavras em destaque) e branco. De apoio, o âmbar `#f2b55a` tirado do varal de lâmpadas da varanda (estrelas, lâmpadas, rótulos sobre preto), o creme `#f4ede2` das seções claras e o laranja escuro `#a63d00` para texto sobre fundo claro (o laranja do logo não atinge contraste AA em texto).
- **Fontes**: Oswald (condensada, caixa alta, como placa de bar) nos títulos, botões e rótulos; Lora (serifa, como cardápio) no texto corrido e em itálico nas avaliações. Arquivos locais em `assets/fonts`, subconjunto latino.
- **Elementos próprios**: varal de luzes desenhado em CSS (no hero e no fecho), com balanço sutil que respeita `prefers-reduced-motion`; avaliações em bolachas de chope redondas, levemente giradas; "balcão" de miniaturas com rolagem horizontal; ícones dos três momentos (prato, copo, microfone) desenhados em SVG.
- **Estrutura**: hero com a entrada à noite e o brasão; "O dia no Firula" com três momentos (almoço caseiro, boteco e drinks, shows ao vivo); "Cozinha e bar" com as fotos publicadas pela casa; "A casa" com cinco fotos; "Avaliações" com o 4,6 e as três bolachas; "Reserva e endereço" com contatos e mapa; chamada final; rodapé.

## Imagens

Todas vêm de `materiais-de-origem/` e são geradas por `tools/optimize-images.py` (Pillow). Nenhuma imagem é ampliada: a maior versão de cada uma tem o tamanho do original.

| Arquivo em `assets/img` | Origem | Uso | Observação |
| --- | --- | --- | --- |
| `entrada-*` | `fotos/firula-02.png` (1448x1086) | Fundo do hero | Letreiro e varal de luzes; gradiente escurece a base para o texto |
| `varanda-*` | `fotos/firula-05.png` | A casa (foto grande) | |
| `salao-*` | `fotos/firula-03.png` | A casa | |
| `palco-*` | `fotos/firula-04.png` | A casa (noite de show) e imagem de compartilhamento | |
| `fachada-esquina-*` | `fotos/firula-01.png` | A casa (foto larga) | Recorte 16:7 via CSS |
| `hamburguer-*` | `Screenshot ... 171712.png` (676x381) | Balcão | Borda da captura removida |
| `frango-com-queijo-*` | `Screenshot ... 171745.png` (563x434) | Balcão | |
| `moscow-mule-*` | `Screenshot ... 171549.png` (895x894) | Balcão | Cortada a 700 px de altura para tirar o texto do post |
| `drink-morango-*`, `drink-laranja-*`, `drink-frutas-vermelhas-*`, `drink-azul-*` | demais capturas (283 a 381 px de largura) | Balcão | Pequenas; exibidas em até 220 px de largura |
| `logo-firula-{300,400,600}` | `logo/Firula Restaurante e Bar Logo.png` (1492x724) | Cabeçalho e rodapé | Só a margem transparente foi recortada |
| `brasao-firula-{160,240,360}` | `logo/brasao_firula.png` (629x710) | Hero, fecho, ícones | |
| `favicon-32`, `apple-touch-icon`, `icon-192` | brasão sobre o preto | Ícones | Gerados pelo `optimize-images.py` |
| `compartilhamento.jpg` | montagem (1200x630) | Open Graph / WhatsApp | `node tools/render-compartilhamento.js` |

As fachadas mostram patrocinadores (Amstel, bandeiras de eventos) e um banner de happy hour. Nada disso foi afirmado no texto, porque não está no briefing.

Para regenerar: `python3 tools/optimize-images.py` e, com Playwright disponível, `node tools/render-compartilhamento.js` (variáveis `PLAYWRIGHT_MODULE` e `CHROMIUM_PATH` opcionais).

## Links e mensagens

| Onde | Destino |
| --- | --- |
| Reservar (cabeçalho, hero, contatos, fecho, rodapé, botão flutuante) | WhatsApp com "Olá! Vi o site do Firula e quero fazer uma reserva." |
| Perguntar o prato do dia (Almoço caseiro) | WhatsApp com "Olá! Vi o site do Firula e quero saber o prato executivo de hoje." |
| Perguntar sobre o cardápio (Cozinha e bar) | WhatsApp com "Olá! Vi o site do Firula e quero saber sobre o cardápio." |
| Programação / @firulabar | Instagram |
| Endereço, Abrir no Google Maps, Como chegar | `https://www.google.com/maps/search/?api=1&query=Firula+Bar,+Av.+Curitiba,+289,+Maringá+PR` |

Todos os links externos abrem em nova aba com `rel="noopener"`.

## Decisões

- A nota 4,6 e as 2.479 avaliações entram no texto porque foram conferidas no Google e batem com o briefing.
- Horário de funcionamento e programação de shows não foram informados; o site não inventa e orienta a confirmar pelo WhatsApp/Instagram.
- As capturas de comida são pequenas (283 a 895 px); em vez de esticá-las, viraram um balcão de miniaturas no tamanho natural, com rolagem horizontal.
- Texto preto sobre os botões laranja (o branco não atinge contraste AA sobre `#fe6603`).
- Sem legenda sobre a foto do hero; as legendas ficam na seção "A casa".
- JavaScript só acrescenta: menu, cabeçalho sólido ao rolar, animações de entrada e o contador do 4,6. Sem JS tudo aparece, o menu fica aberto e o botão de menu some.

## Testes (02/10/2026, Chromium via Playwright)

41 verificações aprovadas, entre elas:

- Sem rolagem horizontal em 320, 360, 390, 480, 600, 768, 900, 1024, 1200, 1440 e 1920 px; título do hero em 2 linhas de 480 px para cima e em 3 no celular.
- Contraste AA em todos os textos (incluindo o cabeçalho translúcido sobre a foto).
- Menu no celular: abre, fecha com Esc, foco volta ao botão, áreas de toque de 54 px.
- Navegação por teclado, link de pular para o conteúdo, âncoras com destino.
- Sem JavaScript: conteúdo e menu visíveis. Com `prefers-reduced-motion`: sem animações.
- Carga inicial no celular (390 px, DPR 3) abaixo de 700 KB; 939 KB após rolar a página toda, mais 1,8 MB do mapa do Google, carregado só ao chegar na seção.
- Nenhuma imagem exibida acima do tamanho do original em 390 e 1920 px.
- Dados estruturados `BarOrPub` com endereço, telefone e `aggregateRating`.

## Pendências

- Horário de funcionamento e dias de show, se o cliente quiser publicar.
- Fotos de perfil de quem avaliou, se forem autorizadas.
- Confirmar com o cliente se o cardápio deve ser publicado (hoje o site manda perguntar pelo WhatsApp).
- Publicar e apontar o domínio; trocar as URLs relativas de `og:image` por absolutas quando houver domínio.

## Estrutura

```
index.html
assets/css/styles.css
assets/js/main.js
assets/fonts/      Oswald e Lora (woff2, subconjunto latino)
assets/img/        imagens otimizadas (geradas)
tools/optimize-images.py
tools/render-compartilhamento.js
materiais-de-origem/   originais do cliente (fora do git)
```

## Repositório

- GitHub: `git@github.com:joabegalvao/firulabar.git` (branch `main`)
- Portfólio: publicado também em `gostoudosite.com.br/firulabar/` (o Dockerfile do gostoudosite clona este repositório na pasta `firulabar`)
- Os originais do cliente ficam só na pasta local `materiais-de-origem/`, fora do git
