# Pesquisa de Arquitetura - Liturgia Diária com IA

## APIs de Liturgia Disponíveis

### 1. Lectionary API (https://lectio-api.org/)

**Características:**
- API REST moderna e bem documentada
- Suporta tradições católicas, RCL (Revised Common Lectionary) e Episcopal
- Endpoints para obter leituras por data, intervalo de datas, ou dia atual
- Acesso a calendário litúrgico e estações litúrgicas
- Documentação OpenAPI 3.0 completa

**Endpoints Principais:**
- `GET /api/v1/readings/today` - Leituras de hoje
- `GET /api/v1/readings?date=YYYY-MM-DD&tradition=catholic` - Leituras para data específica
- `GET /api/v1/calendar/current` - Informações do calendário litúrgico atual
- `GET /api/v1/traditions` - Lista de tradições disponíveis

**Vantagens:**
- Gratuita e open-source
- Suporte específico para tradição católica
- Dados estruturados em JSON
- Sem autenticação necessária

### 2. Church Calendar API (http://calapi.inadiutorium.cz/)

**Características:**
- API para calendário litúrgico católico romano
- Suporta múltiplos idiomas (Inglês, Francês, Italiano, Latim, Tcheco)
- Dados detalhados sobre celebrações e festas litúrgicas
- Informações sobre temporada litúrgica e semana

**Endpoints Principais:**
- `GET /api/v0/en/calendars/default/today` - Dia de hoje
- `GET /api/v0/en/calendars/default/YYYY/MM/DD` - Data específica
- `GET /api/v0/en/calendars/default/YYYY/MM` - Mês inteiro

**Dados Retornados:**
```json
{
  "date": "2026-04-07",
  "season": "lent",
  "season_week": 5,
  "celebrations": [
    {
      "title": "Tuesday of the Fifth Week of Lent",
      "colour": "violet",
      "rank": "ferial",
      "rank_num": 3.13
    }
  ],
  "weekday": "tuesday"
}
```

**Vantagens:**
- Informações detalhadas sobre celebrações litúrgicas
- Suporte a múltiplos idiomas
- Dados estruturados sobre temporadas e semanas litúrgicas

### 3. Fontes Brasileiras

**CNBB (Conferência Nacional dos Bispos do Brasil):**
- URL: https://www.cnbb.org.br/liturgia-diaria/
- Fornece liturgia diária em português
- Não possui API pública, mas conteúdo pode ser consultado via web

**Canção Nova:**
- URL: https://liturgia.cancaonova.com/pb/
- Aplicativo com liturgia diária e reflexões
- Oferece áudio das leituras

## Arquitetura Recomendada

### Stack Técnico

**Frontend (Mobile):**
- React Native com Expo
- TypeScript
- NativeWind (Tailwind CSS)
- AsyncStorage para cache local
- React Query para gerenciamento de dados remotos

**Backend (Opcional - Para Análise com IA):**
- Node.js com Express
- OpenAI API para análise teológica
- PostgreSQL para armazenar análises em cache
- Drizzle ORM para gerenciamento de banco de dados

### Fluxo de Dados

```
1. App Mobile
   ↓
2. Fetch Liturgia do Dia
   ├─ Lectionary API (/api/v1/readings/today?tradition=catholic)
   └─ Cache em AsyncStorage
   ↓
3. Usuário solicita Análise Teológica
   ↓
4. Backend Node.js
   ├─ Recebe dados da liturgia
   ├─ Envia para OpenAI com prompt estruturado
   └─ Retorna análise teológica
   ↓
5. App exibe análise
   └─ Cache em AsyncStorage
```

### Estrutura do Prompt para IA

O prompt deve incluir:
- Contexto: Tradição católica, magistério da Igreja
- Leituras: Entrada, Leitura 1, Salmo, Leitura 2, Evangelho
- Solicitação: Análise teológica, conexões litúrgicas, aplicação prática
- Referências: Documentos do Vaticano, Catecismo da Igreja Católica

**Exemplo de Prompt:**
```
Você é um teólogo católico especializado em exegese bíblica e tradição da Igreja.
Analise as seguintes leituras da liturgia de hoje:

[Leituras aqui]

Forneça:
1. Comentário geral sobre o tema do dia
2. Análise teológica de cada leitura baseada na tradição católica
3. Conexões com documentos do Vaticano II e magistério recente
4. Aplicação prática para a vida cristã
5. Sugestões de pontos para meditação

Mantenha um tom respeitoso e acadêmico.
```

## Decisões de Implementação

### Fase 1: MVP (Mínimo Viável)
- Integração com Lectionary API para obter leituras
- Exibição simples da liturgia do dia
- Cache local com AsyncStorage
- Sem análise de IA (apenas exibição de leituras)

### Fase 2: Análise com IA
- Backend Node.js com OpenAI
- Geração de análise teológica
- Cache de análises
- Tratamento de erros e rate limiting

### Fase 3: Recursos Avançados
- Notificações diárias
- Favoritos e histórico
- Busca por data
- Múltiplos idiomas
- Modo offline

## Considerações de Custo

**Lectionary API:** Gratuita
**OpenAI API:** Aproximadamente $0.01-0.05 por análise (dependendo do modelo)
- Recomendação: Usar GPT-4 Mini para reduzir custos
- Cache de análises para evitar requisições duplicadas

## Próximos Passos

1. Implementar integração com Lectionary API
2. Criar telas de exibição da liturgia
3. Configurar backend Node.js
4. Implementar análise com OpenAI
5. Adicionar cache e persistência
6. Testar e polir UI/UX
