# GhostBlocker

Ofuscação inteligente de texto e imagem para contornar algoritmos de IA e sistemas de moderação automatizada de redes sociais.

## O que é

GhostBlocker é uma ferramenta educacional de ofuscação de conteúdo que aplica técnicas adversariais em texto e imagens, diretamente no navegador, sem enviar dados para servidores externos.

Redes sociais e plataformas utilizam cada vez mais mecanismos de IA para:

- **Censurar** conteúdo automaticamente
- **Reduzir o alcance** (shadowban) de publicações
- **Classificar e rotular** usuários e mensagens
- **Bloquear** contas com base em reconhecimento de padrões

GhostBlocker aplica ofuscação que mantém o conteúdo legível para humanos, mas dificulta ou impede que algoritmos de IA identifiquem, classifiquem ou modifiquem o alcance do conteúdo.

## Funcionalidades

### Ofuscação de Texto

Quatro técnicas de ofuscação via caracteres Unicode:

| Técnica | Descrição |
|---|---|
| **Homoglifos + Invisíveis** | Substitui caracteres por equivalentes visuais de outros alfabetos (cirílico, grego, etc.) e insere caracteres de largura zero entre os caracteres legíveis |
| **Caracteres Invisíveis** | Insere caracteres de largura zero (Zero Width Space, Non-Joiner) entre cada caractere do texto original |
| **Largura Inteira Unicode** | Converte caracteres ASCII para sua versão de largura inteira (Fullwidth), usada em japonês, chinês e coreano |
| **Marcas Diacríticas** | Adiciona acentos e marcas combinatórias Unicode sobre cada caractere, tornando o texto diferente para a máquina mas idêntico visualmente para humanos |

Intensidade ajustável (10% a 100%) para controlar quantos caracteres são modificados.

### Ofuscação de Imagem

Sete técnicas adversariais projetadas para atacar especificamente redes neurais convolucionais (CNNs):

| Técnica | Descrição |
|---|---|
| **Ruído Adversarial Estruturado** | Padrões espaciais correlacionados que criam falsos gradientes nas camadas convolucionais da IA |
| **Perturbação de Bordas** | Detecta bordas via operador Sobel e injeta ruído adversarial onde a IA mais extrai features |
| **Desacoplamento de Canais** | Quebra correlações entre canais RGB usadas por CNNs para reconhecimento de objetos |
| **Injeção de Frequência** | Padrões de onda em múltiplas bandas de frequência que ativam falsos positivos nas camadas da IA |
| **Saturação Anti-Feature** | Cria texturas falsas em regiões uniformes (céu, paredes) para confundir a segmentação semântica |
| **Distorção Geométrica** | Deslocamento sutil de pixels com ondas multi-frequência, quebrando a invariância espacial das CNNs |
| **Injeção EXIF** | Injeta metadados falsos de câmera diretamente no binário JPEG, alterando a impressão digital do arquivo |

### Laboratório de Testes

Ferramentas de análise para comparar o original e o ofuscado:

- **Texto**: entropia de Shannon, tamanho em bytes UTF-8, distribuição Unicode, diff caractere a caractere, detecção de caracteres invisíveis
- **Imagem**: mapa de diferenças pixel a pixel, PSNR (Peak Signal-to-Noise Ratio), histograma de luminância, delta por canal RGB, contagem de pixels modificados

## Como usar

1. Acesse a página principal em **Início**
2. Escolha a ferramenta desejada: **Texto** ou **Mídia**
3. Cole seu conteúdo e ajuste as configurações
4. Copie o resultado ofuscado e publique normalmente

### Testar com IA

Após ofuscar, use o botão **Testar com ChatGPT** para abrir o ChatGPT e verificar se a IA consegue ler seu conteúdo. Se a ofuscação estiver correta, a IA não deve conseguir interpretar o texto ou identificar objetos na imagem.

## Arquitetura

```
├── index.html                  # Página inicial / landing
├── assets/
│   ├── css/
│   │   └── style.css           # Design system (tokens, layout, componentes)
│   ├── js/
│   │   ├── text_cript.js       # Motor de ofuscação de texto
│   │   ├── media_cript.js      # Motor de ofuscação de imagem
│   │   └── lab_script.js       # Análise comparativa
│   └── images/
│       └── ghost-logo.png      # Logo do projeto
├── pages/
│   └── Members/
│       ├── Text/
│       │   └── index.html      # Interface de ofuscação de texto
│       ├── Media/
│       │   └── index.html      # Interface de ofuscação de imagem
│       └── Lab/
│           └── index.html      # Laboratório de análise
└── .github/
    └── workflows/
        └── deploy.yml          # Deploy automático para GitHub Pages
```

### Decisões técnicas

- **Vanilla JS sem dependências**: processamento 100% client-side via Canvas API e manipulação de strings Unicode
- **CSS com variáveis**: design system centralizado em `:root` para consistência visual
- **CSS injetado via JS**: estilos de componentes específicos são injetados dinamicamente para manter o CSS principal limpo
- **Sem backend**: todo processamento acontece no navegador, zero dados enviados a servidores

## Deploy

O deploy é automático via GitHub Actions. A cada push na branch `main`, o workflow:

1. Faz checkout do código
2. Deploya automaticamente para GitHub Pages

O fluxo de trabalho está em `.github/workflows/deploy.yml`.

## Caráter educacional

GhostBlocker é desenvolvido com propósitos exclusivamente educacionais e de liberdade de expressão. O projeto demonstra como técnicas de ofuscação podem ser usadas para proteger a privacidade e contornar sistemas de moderação automatizada, evidenciando as limitações dos filtros de IA atuais.

## Aviso

Esta ferramenta é fornecida "como está". Os autores não se responsabilizam pelo uso indevido. O usuário é inteiramente responsável por cumprir os termos de serviço das plataformas onde publicar conteúdo ofuscado.
