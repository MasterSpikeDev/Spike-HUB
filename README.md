# Spike Jr

Bot do Discord movido pela API Gemini. Ele usa os modelos na ordem configurada, troca automaticamente quando um modelo atinge limite/indisponibilidade e para de responder quando todas as cotas diárias terminam.

## Executar

1. Instale Node.js 20 ou superior e rode `npm install`.
2. Copie `.env.example` para `.env` e preencha `DISCORD_TOKEN` e `GEMINI_API_KEY`.
3. No Discord Developer Portal, habilite **Message Content Intent** para o bot.
4. Rode `npm start` e envie `!spike sua pergunta` em um canal acessível ao bot.

`GEMINI_MODELS` aceita uma lista `modelo:limite` separada por vírgulas. A ordem é a prioridade: o primeiro modelo sempre é tentado antes dos demais. Modelos com cota zero devem ficar fora da lista. Ajuste os nomes e limites conforme os modelos efetivamente liberados no projeto Google AI Studio; nomes não disponíveis são ignorados automaticamente até a renovação diária.

O consumo é persistido em `.data/gemini-fuel.json` e reiniciado no começo de cada dia do fuso do provedor (`America/Los_Angeles`). Erros de capacidade (`429`, quota/rate limit e `503`) acionam o próximo tanque; erros comuns não são mascarados como falta de combustível.
