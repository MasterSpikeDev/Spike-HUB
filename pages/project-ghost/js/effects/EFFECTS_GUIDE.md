# Documentação dos efeitos do Reader Imersivo

Este guia é somente para leitura/configuração. Para ativar um efeito, adicione `effects` dentro da cena do capítulo:

```js
effects: [
  { id: "rain", intensity: 0.7 },
  { id: "darkness", layer: "page", edgeOpacity: 0.35 }
]
```

## Camadas disponíveis

Todo efeito pode receber estas opções de camada:

| Opção | Tipo | Padrão | Função |
| --- | --- | --- | --- |
| `layer` | string | `"background"` | Define onde o efeito será desenhado. Use `"background"` para ficar atrás do PDF ou `"page"` para ficar por cima da página/PDF. `"pdf"` também é aceito como alias de `"page"`. |
| `overPdf` | boolean | `false` | Atalho para renderizar por cima do PDF. Se `true`, equivale a `layer: "page"`. |
| `key` | string | automático | Identificador opcional para permitir mais de uma instância do mesmo efeito na mesma camada. Normalmente não precisa usar. |

Exemplo atrás do PDF:

```js
{ id: "rain", intensity: 0.6 }
```

Exemplo por cima do PDF:

```js
{ id: "rain", layer: "page", intensity: 0.6 }
```

## Opções comuns das partículas

Os efeitos de partículas são: `rain`, `fog`, `smoke`, `snow`, `ashes`, `dust`, `voidParticles`, `embers`, `fire`, `sparks`, `leaves` e `cherryBlossoms`.

Todos eles aceitam estas opções:

| Opção | Tipo | Padrão | Função |
| --- | --- | --- | --- |
| `id` | string | obrigatório | Nome do efeito. |
| `intensity` | number | `1` | Multiplica a quantidade máxima e o nascimento de partículas. O motor limita o valor efetivo entre `0` e `3` por performance. |
| `quantity` | number | varia por efeito | Quantidade base de partículas antes do multiplicador `intensity`. |
| `maxParticles` | number | sem limite extra | Teto opcional de segurança depois de aplicar `quantity * intensity`. Útil para configs agressivas. |
| `spawnRate` | number | varia por efeito | Quantas partículas novas podem nascer por segundo antes do multiplicador `intensity`. |
| `speed` | number | varia por efeito | Velocidade base do movimento. |
| `color` | string | varia por efeito | Cor principal. Aceita `#hex`, `rgb(...)` ou `rgba(...)`. |
| `opacity` | number | varia por efeito | Transparência base do efeito, de `0` a `1`. |
| `size` | number | varia por efeito | Tamanho/espessura base das partículas. |
| `wind` | number | só em alguns | Força horizontal/vento. Valor positivo puxa para direita; negativo para esquerda. |
| `fadeIn` | number | `650` | Tempo de entrada do efeito em ms. |
| `fadeOut` | number | `650` | Tempo de saída do efeito em ms. |
| `layer` | string | `"background"` | Camada do efeito. |
| `overPdf` | boolean | `false` | Atalho para camada de página. |
| `key` | string | automático | Chave opcional para instâncias duplicadas. |
| `loop` | boolean | `true` | Mantém a partícula em loop. Quando uma partícula sai da tela/morre, ela é resetada ou substituída. Use `false` apenas para efeito único que deve terminar sozinho. |

> Observação: por padrão, todas as partículas são loop contínuo (`loop: true`). Quando uma partícula morre/sai da tela, ela volta pelo `reset` do efeito e continua enquanto a cena estiver ativa. Você não precisa configurar tudo; cada efeito tem padrões próprios. Configure só o que quiser ajustar.
>
> Configs muito altas, como `quantity: 1000` com `intensity: 10`, podem parecer que "travaram" ou que não estão em loop porque geram partículas demais. O motor usa `intensity` efetiva até `3`; se quiser muita partícula com segurança, prefira `quantity: 1000`, `intensity: 3` e, se necessário, `maxParticles: 1200` ou `1500`.

---

# Partículas cadastradas

## `rain` — chuva

Chuva em linhas diagonais rápidas. É um dos efeitos mais leves e estáveis.

### Opções específicas

| Opção | Padrão | Função |
| --- | --- | --- |
| `quantity` | `180` | Número máximo de gotas. |
| `spawnRate` | `90` | Velocidade de reposição das gotas. |
| `speed` | `900` | Velocidade vertical da chuva. |
| `color` | `"rgba(180,210,255,.72)"` | Cor das gotas. |
| `opacity` | `0.55` | Transparência das gotas. |
| `size` | `1.2` | Espessura da linha. |
| `length` | `26` | Comprimento máximo das gotas. |
| `wind` | `-140` | Inclinação/deslocamento horizontal. |
| `intensity`, `maxParticles`, `fadeIn`, `fadeOut`, `layer`, `overPdf`, `key`, `loop` | comuns | Controles gerais. |

### Exemplo leve

```js
{ id: "rain", intensity: 0.45, quantity: 120, speed: 720, opacity: 0.32 }
```

### Exemplo forte sobre o PDF

```js
{ id: "rain", layer: "page", intensity: 0.9, quantity: 190, spawnRate: 95, speed: 900, opacity: 0.42, size: 1.2, length: 28, wind: -140, fadeIn: 700, fadeOut: 800 }
```

## `fog` — neblina

Neblina lenta e ampla. É uma variação de `smoke` com partículas maiores e mais suaves.

### Opções específicas

| Opção | Padrão | Função |
| --- | --- | --- |
| `quantity` | `55` | Quantidade máxima de massas de neblina. |
| `spawnRate` | `8` | Reposição lenta de neblina. |
| `speed` | `16` | Velocidade vertical/subida. |
| `color` | `"rgba(210,215,220,.34)"` | Cor da neblina. |
| `opacity` | `0.22` | Transparência geral. |
| `size` | `95` | Tamanho das massas. |
| `spread` | `2.4` | Espalhamento horizontal. |
| `intensity`, `maxParticles`, `fadeIn`, `fadeOut`, `layer`, `overPdf`, `key`, `loop` | comuns | Controles gerais. |

### Exemplo sutil

```js
{ id: "fog", intensity: 0.35, quantity: 42, speed: 12, opacity: 0.18, size: 95, spread: 2.4 }
```

### Exemplo denso

```js
{ id: "fog", intensity: 0.7, quantity: 75, spawnRate: 10, speed: 18, opacity: 0.28, size: 120, spread: 3, fadeIn: 1400, fadeOut: 1200 }
```

## `smoke` — fumaça

Fumaça que sobe, cresce e desaparece. Usa gradiente radial, então é mais pesada que chuva/cinzas.

### Opções específicas

| Opção | Padrão | Função |
| --- | --- | --- |
| `quantity` | `90` | Quantidade máxima de partículas de fumaça. |
| `spawnRate` | `22` | Reposição de fumaça por segundo. |
| `speed` | `34` | Velocidade de subida. |
| `color` | `"rgba(185,185,190,.55)"` | Cor do centro da fumaça. |
| `opacity` | `0.35` | Transparência geral. |
| `size` | `38` | Raio inicial máximo das partículas. |
| `spread` | `1` | Espalhamento horizontal. |
| `intensity`, `maxParticles`, `fadeIn`, `fadeOut`, `layer`, `overPdf`, `key`, `loop` | comuns | Controles gerais. |

### Exemplo

```js
{ id: "smoke", intensity: 0.5, quantity: 70, spawnRate: 18, speed: 28, opacity: 0.3, size: 45, spread: 1.4 }
```

## `snow` — neve

Flocos brancos caindo lentamente com oscilação horizontal.

### Opções específicas

| Opção | Padrão | Função |
| --- | --- | --- |
| `quantity` | `110` | Número máximo de flocos. |
| `spawnRate` | `24` | Reposição dos flocos. |
| `speed` | `70` | Velocidade da queda. |
| `color` | `"#fff"` | Cor dos flocos. |
| `opacity` | `0.68` | Transparência dos flocos. |
| `size` | `2.2` | Raio máximo dos flocos. |
| `wind` | `18` | Vento horizontal. |
| `intensity`, `maxParticles`, `fadeIn`, `fadeOut`, `layer`, `overPdf`, `key`, `loop` | comuns | Controles gerais. |

### Exemplo

```js
{ id: "snow", intensity: 0.6, quantity: 100, spawnRate: 22, speed: 55, opacity: 0.65, size: 2, wind: 12 }
```

## `ashes` — cinzas

Pequenos fragmentos cinzas caindo/flutuando.

### Opções específicas

| Opção | Padrão | Função |
| --- | --- | --- |
| `quantity` | `85` | Quantidade máxima de cinzas. |
| `spawnRate` | `26` | Reposição das cinzas. |
| `speed` | `58` | Velocidade vertical. |
| `color` | `"rgba(190,185,175,.8)"` | Cor das cinzas. |
| `opacity` | `0.48` | Transparência. |
| `size` | `2.4` | Tamanho dos fragmentos. |
| `wind` | `28` | Vento horizontal. |
| `intensity`, `maxParticles`, `fadeIn`, `fadeOut`, `layer`, `overPdf`, `key`, `loop` | comuns | Controles gerais. |

### Exemplo

```js
{ id: "ashes", intensity: 0.45, quantity: 70, spawnRate: 22, speed: 38, opacity: 0.38, size: 2.2, wind: 24 }
```

## `dust` — poeira

Variação de `ashes`, mais lenta, menor e bege. Boa para sótão, sala velha e ambiente abandonado.

### Opções específicas

| Opção | Padrão | Função |
| --- | --- | --- |
| `quantity` | `70` | Quantidade máxima de poeira. |
| `spawnRate` | `10` | Reposição lenta. |
| `speed` | `18` | Velocidade vertical. |
| `color` | `"rgba(215,200,170,.55)"` | Cor da poeira. |
| `opacity` | `0.25` | Transparência. |
| `size` | `1.8` | Tamanho dos pontos/fragmentos. |
| `wind` | `8` | Vento horizontal. |
| `intensity`, `maxParticles`, `fadeIn`, `fadeOut`, `layer`, `overPdf`, `key`, `loop` | comuns | Controles gerais. |

### Exemplo

```js
{ id: "dust", intensity: 0.4, quantity: 60, spawnRate: 8, speed: 14, opacity: 0.22, size: 1.8, wind: 8 }
```

## `voidParticles` — partículas do vazio

Partículas sobrenaturais com composição luminosa (`lighter`). Boas para sonho, vazio, dimensão estranha e cenas abstratas. Este efeito tem reciclagem própria: quando uma partícula sai da tela, ela volta para o fluxo automaticamente enquanto `loop` estiver ativo.

### Opções específicas

| Opção | Padrão | Função |
| --- | --- | --- |
| `quantity` | `120` | Quantidade máxima de partículas. |
| `spawnRate` | `20` | Reposição por segundo. |
| `speed` | `42` | Velocidade de deslocamento. |
| `color` | `"#7c4dff"` | Cor das partículas. |
| `opacity` | `0.5` | Transparência/brilho. |
| `size` | `2.3` | Raio máximo. |
| `origin` | `"center"` | Origem do reaparecimento das partículas. Use `"center"` para nascer perto do centro ou `"screen"` para nascer espalhado pela tela. |
| `loop` | `true` | Mantém o vazio reciclando partículas continuamente. |
| `intensity`, `maxParticles`, `fadeIn`, `fadeOut`, `layer`, `overPdf`, `key` | comuns | Controles gerais. |

### Exemplo discreto

```js
{ id: "voidParticles", intensity: 0.35, quantity: 80, spawnRate: 16, speed: 24, color: "#6f6f78", opacity: 0.35, size: 2.1, origin: "center", loop: true }
```

### Exemplo sobrenatural forte

```js
{ id: "voidParticles", layer: "page", intensity: 3, quantity: 1000, maxParticles: 1500, spawnRate: 40, speed: 48, color: "#7c4dff", opacity: 0.55, size: 2.6, origin: "screen", loop: true }
```

## `embers` — brasas

Pontos quentes subindo com brilho. Usa composição `lighter`.

### Opções específicas

| Opção | Padrão | Função |
| --- | --- | --- |
| `quantity` | `95` | Quantidade máxima de brasas. |
| `spawnRate` | `34` | Reposição por segundo. |
| `speed` | `72` | Velocidade de subida. |
| `color` | `"#ff8a2a"` | Cor das brasas. |
| `opacity` | `0.72` | Transparência/brilho. |
| `size` | `2.8` | Raio máximo. |
| `intensity`, `maxParticles`, `fadeIn`, `fadeOut`, `layer`, `overPdf`, `key`, `loop` | comuns | Controles gerais. |

### Exemplo

```js
{ id: "embers", intensity: 0.7, quantity: 90, spawnRate: 34, speed: 70, opacity: 0.7, size: 2.5, color: "#ff8a2a" }
```

## `fire` — fogo estilizado por partículas

Variação mais intensa de `embers`. Não desenha labaredas realistas; funciona como partículas de fogo.

### Opções específicas

| Opção | Padrão | Função |
| --- | --- | --- |
| `quantity` | `130` | Quantidade máxima de partículas. |
| `spawnRate` | `70` | Reposição rápida. |
| `speed` | `105` | Velocidade de subida. |
| `color` | `"#ff5a1f"` | Cor principal. |
| `opacity` | `0.8` | Transparência/brilho. |
| `size` | `4` | Tamanho das partículas. |
| `intensity`, `maxParticles`, `fadeIn`, `fadeOut`, `layer`, `overPdf`, `key`, `loop` | comuns | Controles gerais. |

### Exemplo

```js
{ id: "fire", intensity: 0.8, quantity: 130, spawnRate: 70, speed: 105, opacity: 0.8, size: 4, color: "#ff5a1f" }
```

## `sparks` — faíscas

Variação rápida e pequena de `embers`. Boa para impacto, curto-circuito, metal ou acidente.

### Opções específicas

| Opção | Padrão | Função |
| --- | --- | --- |
| `quantity` | `70` | Quantidade máxima de faíscas. |
| `spawnRate` | `45` | Reposição por segundo. |
| `speed` | `150` | Velocidade de subida/movimento. |
| `color` | `"#ffd166"` | Cor das faíscas. |
| `opacity` | `0.85` | Transparência/brilho. |
| `size` | `1.7` | Tamanho das faíscas. |
| `intensity`, `maxParticles`, `fadeIn`, `fadeOut`, `layer`, `overPdf`, `key`, `loop` | comuns | Controles gerais. |

### Exemplo

```js
{ id: "sparks", intensity: 0.8, quantity: 70, spawnRate: 45, speed: 150, opacity: 0.85, size: 1.7, color: "#ffd166" }
```

## `leaves` — folhas

Variação de `ashes` com fragmentos maiores e cor marrom/alaranjada. Representa folhas estilizadas.

### Opções específicas

| Opção | Padrão | Função |
| --- | --- | --- |
| `quantity` | `55` | Quantidade máxima de folhas. |
| `spawnRate` | `12` | Reposição por segundo. |
| `speed` | `45` | Velocidade da queda. |
| `color` | `"rgba(126,82,35,.85)"` | Cor das folhas. |
| `opacity` | `0.62` | Transparência. |
| `size` | `5` | Tamanho dos fragmentos. |
| `wind` | `45` | Vento horizontal. |
| `intensity`, `maxParticles`, `fadeIn`, `fadeOut`, `layer`, `overPdf`, `key`, `loop` | comuns | Controles gerais. |

### Exemplo

```js
{ id: "leaves", intensity: 0.45, quantity: 55, spawnRate: 12, speed: 45, opacity: 0.62, size: 5, wind: 45, color: "rgba(126,82,35,.85)" }
```

## `cherryBlossoms` — pétalas de cerejeira

Pétalas rosadas com queda, rotação e balanço lateral.

### Opções específicas

| Opção | Padrão | Função |
| --- | --- | --- |
| `quantity` | `70` | Quantidade máxima de pétalas. |
| `spawnRate` | `16` | Reposição por segundo. |
| `speed` | `48` | Velocidade da queda. |
| `color` | `"rgba(255, 185, 215, .9)"` | Cor das pétalas. |
| `opacity` | `0.72` | Transparência. |
| `size` | `6` | Tamanho das pétalas. |
| `wind` | `28` | Vento horizontal. |
| `intensity`, `maxParticles`, `fadeIn`, `fadeOut`, `layer`, `overPdf`, `key`, `loop` | comuns | Controles gerais. |

### Exemplo

```js
{ id: "cherryBlossoms", intensity: 0.55, quantity: 80, spawnRate: 18, speed: 42, opacity: 0.72, size: 6, wind: 28, color: "rgba(255, 185, 215, .9)" }
```

---

# Efeitos não-partícula

## `darkness` — borda/vinheta fixa

Borda escura fixa nas extremidades da tela. É parecida com a borda do `heartbeat`, mas não pulsa; permanece enquanto estiver ativa.

### Opções

| Opção | Tipo | Padrão | Função |
| --- | --- | --- | --- |
| `color` | string | `"rgba(0, 0, 0, 1)"` | Cor da borda/vinheta. |
| `edgeOpacity` | number/null | `null` | Força das bordas. Se não for definido, usa `opacity`. |
| `opacity` | number | `0.45` | Alias compatível para força das bordas. |
| `centerOpacity` | number | `0` | Escurecimento do centro. Use `0` para manter o PDF limpo. |
| `innerRadius` | number | `0.42` | Onde a borda começa a aparecer a partir do centro. Maior = centro mais limpo. |
| `outerRadius` | number | `0.74` | Alcance da borda até fora da tela. Normalmente não precisa mexer. |
| `fadeIn` | number | `700` | Tempo de entrada em ms. |
| `fadeOut` | number | `700` | Tempo de saída em ms. |
| `layer`, `overPdf`, `key` | comuns | `background`/automático | Controles de camada. |

### Exemplo recomendado sobre o PDF

```js
{ id: "darkness", layer: "page", color: "#000000", edgeOpacity: 0.35, innerRadius: 0.42, centerOpacity: 0, fadeIn: 1000, fadeOut: 1000 }
```

### Exemplo roxo sobrenatural

```js
{ id: "darkness", layer: "page", color: "#170022", edgeOpacity: 0.45, innerRadius: 0.48, outerRadius: 0.8, fadeIn: 1200, fadeOut: 900 }
```

## `heartbeat` — batida do coração

Pulso de tensão. Faz a página pulsar em direção ao leitor com transformação 3D e desenha uma vinheta pulsante nas bordas.

### Opções

| Opção | Tipo | Padrão | Função |
| --- | --- | --- | --- |
| `bpm` | number | `72` | Batidas por minuto. |
| `intensity` | number | `0.45` | Força do pulso 3D da página. Use baixo para vibração leve. |
| `overlayIntensity` | number/null | `null` | Força independente da vinheta. Se `null`, usa `intensity`. |
| `overlayDuration` | number | `260` | Tempo em ms que a vinheta fica visível/segurada depois da batida. |
| `overlayFadeOut` | number | `520` | Tempo em ms para a vinheta sumir após o `overlayDuration`. |
| `color` | string | `"rgba(255, 0, 42, 1)"` | Cor da vinheta do pulso. |
| `edgeOpacity` | number | `0.5` | Força máxima das bordas no pulso. |
| `sound` | string | ausente | Caminho opcional de áudio do coração. |
| `volume` | number | `0.3` | Volume relativo ao volume global do reader. |
| `fadeIn` | number | `350` | Entrada do efeito em ms. |
| `fadeOut` | number | `500` | Saída do efeito em ms. |
| `layer`, `overPdf`, `key` | comuns | `background`/automático | Normalmente use `layer: "page"`. |

### Exemplo batida leve com borda forte

```js
{ id: "heartbeat", layer: "page", bpm: 72, intensity: 0.12, overlayIntensity: 1, overlayDuration: 550, overlayFadeOut: 900, color: "#8f0015", edgeOpacity: 0.75, fadeIn: 900, fadeOut: 700 }
```

### Exemplo com som

```js
{ id: "heartbeat", layer: "page", bpm: 84, intensity: 0.16, overlayIntensity: 0.9, overlayDuration: 420, overlayFadeOut: 700, color: "#ff1f3d", edgeOpacity: 0.75, sound: "assets/audio/heartbeat.mp3", volume: 0.3 }
```

---

# Combinações úteis

## Cemitério com chuva e neblina

```js
effects: [
  { id: "rain", intensity: 0.75, quantity: 170, speed: 820, opacity: 0.5, fadeIn: 900, fadeOut: 900 },
  { id: "fog", intensity: 0.35, quantity: 42, speed: 12, opacity: 0.18, fadeIn: 1400, fadeOut: 1200 }
]
```

## Cena escura com borda sobre a página

```js
effects: [
  { id: "darkness", layer: "page", color: "#000000", edgeOpacity: 0.35, innerRadius: 0.42, fadeIn: 1000, fadeOut: 1000 }
]
```

## Impacto com chuva por cima do PDF, cinzas e coração

```js
effects: [
  { id: "rain", layer: "page", intensity: 0.85, quantity: 180, speed: 880, opacity: 0.4, fadeIn: 500, fadeOut: 800 },
  { id: "ashes", intensity: 0.45, quantity: 70, speed: 38, opacity: 0.38, fadeIn: 700, fadeOut: 800 },
  { id: "heartbeat", layer: "page", bpm: 84, intensity: 0.16, overlayIntensity: 1, overlayDuration: 420, overlayFadeOut: 700, color: "#ff1f3d", edgeOpacity: 0.75 }
]
```
