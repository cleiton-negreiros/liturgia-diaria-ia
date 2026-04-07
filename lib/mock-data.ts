import { LiturgicalDay, LiturgicalReading } from './types';

export const mockLiturgicalDay: LiturgicalDay = {
  date: new Date().toISOString().split('T')[0],
  weekday: 'tuesday',
  season: 'lent',
  seasonWeek: 5,
  celebration: 'Terça-feira da 5ª Semana da Quaresma',
  colour: 'violet',
  readings: [
    {
      title: 'Antífona de Entrada',
      type: 'entrance',
      text: 'Senhor, ouvi falar de vossas obras e fiquei cheio de temor. No meio dos anos, fazei-as reviver; no meio dos anos, fazei-as conhecer; na vossa ira, lembrai-vos da misericórdia.',
      reference: 'Hab 3, 2',
    },
    {
      title: '1ª Leitura',
      type: 'first-reading',
      text: 'Naqueles dias, Deus falou a Abraão: "Sai de tua terra, de teu povo e da casa de teu pai, e vai para a terra que te mostrarei. Farei de ti um grande povo, abençoar-te-ei, engrandecerei teu nome, e serás uma bênção. Abençoarei os que te abençoarem, e amaldiçoarei os que te amaldiçoarem. E em ti serão abençoadas todas as famílias da terra." Abraão partiu, como o Senhor lhe havia ordenado, e Lot foi com ele. Abraão tinha setenta e cinco anos quando saiu de Harã.',
      reference: 'Gn 12, 1-4a',
    },
    {
      title: 'Salmo Responsorial',
      type: 'psalm',
      text: 'Refrão: Caminharei na presença do Senhor, na terra dos viventes. / Ouço a voz do Senhor que me chama: "Quem há de subir ao meu monte? Quem há de estar de pé no meu lugar santo?" Aquele que tem as mãos inocentes e o coração puro, que não entrega sua alma aos ídolos, nem jura falsamente. / Esse receberá a bênção do Senhor, e a justiça do Deus da salvação. Eis a geração que o procura, que busca a face do Deus de Jacó.',
      reference: 'Sl 26',
    },
    {
      title: '2ª Leitura',
      type: 'second-reading',
      text: 'Irmãos: Temos em Jesus, o Filho de Deus, um sumo sacerdote excelso que penetrou os céus. Agarremo-nos firmemente à fé que professamos. Pois não temos um sumo sacerdote incapaz de compadecer-se de nossas fraquezas; ao contrário, ele foi provado em tudo, à semelhança de nós, mas sem pecado. Aproximemo-nos, pois, com confiança do trono da graça, para alcançarmos misericórdia e encontrarmos graça que nos ajude no momento oportuno.',
      reference: 'Hb 4, 14-16',
    },
    {
      title: 'Evangelho',
      type: 'gospel',
      text: 'Naquele tempo, Jesus disse aos seus discípulos: "Se alguém quer vir após mim, negue-se a si mesmo, tome sua cruz e siga-me. Pois quem quiser salvar sua vida, a perderá; mas quem perder sua vida por causa de mim, a encontrará. Que aproveita ao homem ganhar o mundo inteiro, se perder sua alma? Ou que dará o homem em troca de sua alma? Pois o Filho do Homem há de vir na glória de seu Pai, com seus anjos, e então dará a cada um segundo suas obras."',
      reference: 'Mt 16, 24-27',
    },
    {
      title: 'Antífona de Comunhão',
      type: 'communion',
      text: 'Não é o que entra pela boca que torna o homem impuro, mas o que sai da boca, isso é que o torna impuro, diz o Senhor.',
      reference: 'Mt 15, 11',
    },
  ],
};

export function getMockLiturgicalDay(date: string): LiturgicalDay {
  const dateObj = new Date(date);
  const weekdays = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
  const weekday = weekdays[dateObj.getDay()];

  return {
    ...mockLiturgicalDay,
    date,
    weekday: weekday as any,
  };
}
