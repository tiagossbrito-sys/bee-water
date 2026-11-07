# Bee Water · ficha das lojas

Textos prontos para a App Store e o Google Play. Limites de caracteres já respeitados.

## Identidade

| Campo | Valor |
| --- | --- |
| Nome do app | Bee Water |
| Subtítulo (iOS, 30) | Beba água com a Bee |
| Descrição curta (Play, 80) | Lembretes de água com a Bee, metas por copo e o jogo do Maior Gole do Dia. |
| ID do pacote | br.com.beewater.app |
| Categoria | Saúde e fitness (primária); Estilo de vida (secundária) |
| Classificação etária | Livre / 4+ (sem conteúdo sensível) |
| Idioma | Português (Brasil) |
| Preço | Grátis (compras no app na fase 2) |
| Política de privacidade | https://tiagossbrito-sys.github.io/golee/privacidade.html |
| Suporte | https://tiagossbrito-sys.github.io/golee/suporte.html |
| Palavras-chave (iOS, 100) | água,beber água,hidratação,lembrete,copo,saúde,hábito,meta,bee,gole |

## Descrição completa (Play 4000 / iOS 4000)

Bee Water é a amiga que lembra você de beber água no ritmo certo.

Cada copo é um gole. A cada gole, seu personagem se enche de água e você vê, em segundos, se está no ritmo da sua meta. A regra é simples: um copo por hora, das 8h às 20h, e a meta fecha sozinha.

O QUE A BEE FAZ POR VOCÊ
• Meta de água sugerida pelo seu peso e rotina, baseada em recomendações públicas de saúde, e sempre editável.
• Lembretes no intervalo que você escolher (30, 45, 60 ou 90 min), só no seu horário acordado. Se você acabou de beber, a Bee não insiste.
• Registro em um toque: Gole (1 copo), meia garrafa ou garrafa inteira. Errou? Desfaz em 2 minutos.
• Super Gole a cada litro e Gole Cheio quando a meta fecha, com animação e uma dica de saúde com fonte.
• Streak tolerante: um dia de folga por semana não quebra sua sequência.
• Coleção de personagens: Bee, Gota, Bolha, Baleia, Cacto, Pinguim, Tartaruga e mais, desbloqueados pelo que você conquista.
• Dicas "Sabia que?" sobre água e pele, energia, rins e bem-estar, sempre com link para a fonte.
• Tema claro ou escuro, unidades em ml ou oz, exportação dos seus registros em CSV.

EM BREVE: GRUPOS COM AMIGOS
Crie um grupo, convide por link e dispute o Maior Gole do Dia, da Semana e Geral. O ranking é justo: conta o percentual da sua meta, não só litros.

SEUS DADOS SÃO SEUS
Tudo fica no seu aparelho. Sem conta, sem anúncios, sem rastreadores. Você apaga tudo com um toque.

Bee Water não substitui orientação médica. Pessoas com restrição de líquidos devem seguir a orientação do seu médico.

## Novidades desta versão (0.2.0)

Primeira versão do Bee Water: lembretes nativos que chegam com o app fechado, meta por copo, Super Gole, Gole Cheio, coleção de personagens e dicas com fonte. Grupos com amigos chegam na próxima versão.

## Google Play · Segurança dos dados

| Pergunta | Resposta |
| --- | --- |
| O app coleta ou compartilha dados do usuário? | Não. Os dados ficam apenas no aparelho. |
| Dados criptografados em trânsito? | Não se aplica (nada é transmitido). |
| O usuário pode pedir exclusão? | Sim, no próprio app (Eu → Dados → Apagar conta e dados). |
| Dados de saúde | Registrados só no aparelho; não coletados pelo desenvolvedor. |
| Classificação de conteúdo (IARC) | Sem violência, sexo, drogas, apostas ou conteúdo gerado por usuários. |
| Público-alvo | 13 anos ou mais (não é app infantil). |
| Anúncios | Não contém anúncios. |

## App Store · Privacidade (nutrition label)

| Item | Resposta |
| --- | --- |
| Data Not Collected | Sim: o app não coleta dados vinculados nem não vinculados ao usuário. |
| Tracking | Não rastreia. |
| Account deletion | Disponível no app (exigência 5.1.1(v)). |
| Encryption (ITSAppUsesNonExemptEncryption) | Não (apenas HTTPS padrão). |
| Sign in with Apple | Não exigido: o app não tem login de terceiros. |

## Contas e custos

| Loja | Conta | Custo | Prazo típico de revisão |
| --- | --- | --- | --- |
| Google Play | Play Console (pessoa física ou empresa) | US$ 25 uma vez | 1 a 7 dias; conta nova exige teste fechado com 12 testadores por 14 dias antes da produção |
| App Store | Apple Developer Program | US$ 99 por ano | 1 a 3 dias; exige Mac com Xcode para enviar |

## Passo a passo

### Android
1. Crie a conta no Play Console e o app "Bee Water" (pacote br.com.beewater.app).
2. Gere a chave de upload uma vez: `keytool -genkey -v -keystore upload.keystore -alias beewater -keyalg RSA -keysize 2048 -validity 10000`.
3. Cadastre no GitHub (Settings → Secrets → Actions): ANDROID_KEYSTORE_BASE64 (`base64 -w0 upload.keystore`), ANDROID_KEYSTORE_PASSWORD, ANDROID_KEY_ALIAS=beewater, ANDROID_KEY_PASSWORD.
4. A cada push na main, o workflow "Android" gera `app-release.aab` assinado em Actions → artefatos. Envie em Play Console → Teste interno.
5. Preencha ficha, segurança dos dados e classificação com os textos acima. Suba os screenshots de `docs/loja/screenshots/android`.
6. Teste fechado (12 testadores, 14 dias) e depois produção.

### iOS
1. Entre no Apple Developer Program e crie o app no App Store Connect (bundle br.com.beewater.app).
2. Em um Mac: `npm install && npm run build && npx cap sync ios && npx cap open ios`.
3. No Xcode: selecione o time em Signing & Capabilities, ative Push Notifications só na fase 2 (lembretes locais não precisam), e use Product → Archive → Distribute → App Store Connect.
4. Preencha ficha e privacidade com os textos acima. Suba os screenshots de `docs/loja/screenshots/ios` (6,7" e 6,5").
5. Envie para revisão. Em "Notas para o revisor", explique: "Lembretes são notificações locais; não há login nem servidor nesta versão."

## Checklist antes de enviar
- [ ] Conta Play Console e Apple Developer criadas
- [ ] Chave de upload Android gerada e secrets cadastrados
- [ ] Ícone, splash e screenshots conferidos no aparelho
- [ ] Política de privacidade publicada (link acima no ar)
- [ ] Versão 0.2.0 / versionCode 1 em android/app/build.gradle e no Xcode
- [ ] Teste em aparelho real: lembrete chega com o app fechado; botão "Gole" na notificação registra o copo
