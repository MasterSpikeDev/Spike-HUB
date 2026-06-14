# Guia dos efeitos do Reader Imersivo

Este arquivo é apenas um guia de leitura para configurar cenas. Os efeitos são ativados dentro de cada cena com a chave `effects`.

```js
effects: [
  { id: "rain", intensity: 0.7 },
  { id: "darkness", layer: "page", color: "#000000", opacity: 0.35 }
]
```

## Camadas

Por padrão, efeitos são renderizados no canvas ambiental, acima do background e abaixo do PDF:

```js
{ id: "rain", intensity: 0.6 }
```

Para fazer o efeito invadir/sobrepor o PDF, configure a camada da página:

```js
{ id: "rain", layer: "page", intensity: 0.6 }
```

Também é aceito:

```js
{ id: "rain", overPdf: true, intensity: 0.6 }
```

Use `layer: "page"` apenas quando o efeito deve passar por cima da página. Isso é melhor para chuva intensa, heartbeat, vinheta de escuridão ou momentos de impacto.

## Parâmetros comuns

- `id`: nome do efeito cadastrado.
- `layer`: `"background"` ou `"page"`. Use `"page"` para sobrepor o PDF.
- `overPdf`: atalho booleano para `layer: "page"`.
- `intensity`: força geral do efeito. Normalmente entre `0.1` e `1`.
- `quantity`: limite de partículas.
- `spawnRate`: taxa de nascimento de partículas por segundo.
- `speed`: velocidade geral.
- `color`: cor principal.
- `opacity`: transparência geral.
- `size`: tamanho ou espessura.
- `fadeIn`: entrada em milissegundos.
- `fadeOut`: saída em milissegundos.

## rain

Chuva em linhas diagonais rápidas. É um dos efeitos mais estáveis e baratos.

```js
{ id: "rain", intensity: 0.75, quantity: 170, speed: 820, opacity: 0.5 }
```

Para chuva passando por cima do PDF:

```js
{ id: "rain", layer: "page", intensity: 0.75, quantity: 170, speed: 820, opacity: 0.42 }
```

## fog

Neblina grande e lenta. Boa para cemitério, sonho e madrugada.

```js
{ id: "fog", intensity: 0.35, quantity: 42, speed: 12, opacity: 0.18 }
```

## smoke

Fumaça que sobe e cresce. Mais pesada que chuva porque usa gradientes radiais.

```js
{ id: "smoke", intensity: 0.5, quantity: 70, speed: 28, opacity: 0.3, size: 45 }
```

## snow

Neve lenta com oscilação horizontal.

```js
{ id: "snow", intensity: 0.6, quantity: 100, speed: 55, opacity: 0.65, size: 2 }
```

## ashes

Cinzas pequenas caindo/flutuando. Boa para finais, destruição e melancolia.

```js
{ id: "ashes", intensity: 0.45, quantity: 70, speed: 38, opacity: 0.38 }
```

## dust

Poeira sutil. Boa para sótão, sala abandonada e ambiente velho.

```js
{ id: "dust", intensity: 0.4, quantity: 60, speed: 14, opacity: 0.22 }
```

## voidParticles

Partículas sobrenaturais do vazio. Boa para sonho, relógio, vazio e cenas abstratas.

```js
{ id: "voidParticles", intensity: 0.35, quantity: 80, speed: 24, color: "#6f6f78", opacity: 0.35 }
```

## embers

Brasas quentes subindo. Boa para incêndio, cinzas e tensão.

```js
{ id: "embers", intensity: 0.7, quantity: 90, speed: 70, opacity: 0.7, size: 2.5 }
```

## fire

Versão intensa de brasas. Ainda é fogo estilizado por partículas, não labareda real.

```js
{ id: "fire", intensity: 0.8, quantity: 130, speed: 105, opacity: 0.8, size: 4 }
```

## sparks

Faíscas rápidas e pequenas. Boa para impacto, metal, curto-circuito e acidente.

```js
{ id: "sparks", intensity: 0.8, quantity: 70, speed: 150, opacity: 0.85, size: 1.7 }
```

## leaves

Folhas estilizadas marrons/alaranjadas. Boa para outono, rua e nostalgia.

```js
{ id: "leaves", intensity: 0.45, quantity: 55, speed: 45, opacity: 0.62, size: 5, wind: 45 }
```

## cherryBlossoms

Pétalas de cerejeira. Boa para cenas delicadas, memórias, romance, nostalgia ou contraste poético.

```js
{ id: "cherryBlossoms", intensity: 0.55, quantity: 80, speed: 42, opacity: 0.72, color: "rgba(255, 185, 215, .9)" }
```

## darkness

Overlay/vinheta fixa de escuridão. Não é partícula. Cobre as bordas da tela e se adapta ao formato da viewport.

```js
{ id: "darkness", layer: "page", color: "#000000", opacity: 0.35, centerOpacity: 0.02 }
```

- `opacity`: força nas bordas.
- `centerOpacity`: quanto escurece o centro.
- `color`: cor da vinheta. Pode ser preto, vermelho, roxo etc.

## heartbeat

Pulso de tensão. Não é partícula. Faz a página pulsar em direção ao leitor com transformação 3D e desenha uma vinheta pulsante com cor configurável.

```js
{ id: "heartbeat", layer: "page", bpm: 84, intensity: 0.28, color: "#ff1f3d", edgeOpacity: 0.55 }
```

Com som:

```js
{ id: "heartbeat", layer: "page", bpm: 84, intensity: 0.28, sound: "assets/audio/heartbeat.mp3", volume: 0.3 }
```

- `bpm`: batidas por minuto.
- `intensity`: força do pulso 3D.
- `color`: cor da vinheta no pulso.
- `edgeOpacity`: força da vinheta nas bordas.
- `sound`: áudio opcional.
- `volume`: volume relativo ao volume global do reader.
