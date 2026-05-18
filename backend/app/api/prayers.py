from fastapi import APIRouter, HTTPException, Query
from typing import Optional

from app.models.readings import Language, Prayer

router = APIRouter(prefix="/api/prayers", tags=["prayers"])

# Catholic prayers database in 4 languages
PRAYERS_DB = {
    "holy_guardian_angel": {
        "pt": {
            "title": "Oração do Santo Anjo da Guarda",
            "category": "devotion",
            "content": """Santo Anjo do Senhor,
meu zeloso guardador,
se a ti me confiou a piedade divina,
sempre me rege, me guarde, me governe e me ilumine.

Amém.""",
        },
        "en": {
            "title": "Prayer to the Holy Guardian Angel",
            "category": "devotion",
            "content": """Angel of God,
my guardian dear,
to whom God's love commits me here,
ever this day be at my side,
to light and guard, to rule and guide.

Amen.""",
        },
        "es": {
            "title": "Oración al Santo Ángel de la Guarda",
            "category": "devotion",
            "content": """Ángel de Dios,
que eres mi custodio,
pues la bondad divina me ha encomendado a ti,
ilumíname, guárdame, rígeme y gobiérname.

Amén.""",
        },
        "it": {
            "title": "Preghiera al Santo Angelo Custode",
            "category": "devotion",
            "content": """Angelo di Dio,
che sei il mio custode,
illumina, custodisci,
reggi e governa me,
che ti fui affidato dalla pietà celeste.

Amen.""",
        },
    },
    "our_father": {
        "pt": {
            "title": "Pai Nosso",
            "category": "traditional",
            "content": """Pai Nosso que estais nos Céus,
santificado seja o vosso Nome,
venha a nós o vosso Reino,
seja feita a vossa vontade
assim na terra como no Céu.

O pão nosso de cada dia nos dai hoje,
perdoai-nos as nossas ofensas
assim como nós perdoamos
a quem nos tem ofendido,
e não nos deixeis cair em tentação,
mas livrai-nos do Mal.

Amém.""",
        },
        "en": {
            "title": "Our Father",
            "category": "traditional",
            "content": """Our Father, who art in heaven,
hallowed be thy name;
thy kingdom come;
thy will be done
on earth as it is in heaven.

Give us this day our daily bread;
and forgive us our trespasses
as we forgive those who trespass against us;
and lead us not into temptation,
but deliver us from evil.

Amen.""",
        },
        "es": {
            "title": "Padre Nuestro",
            "category": "traditional",
            "content": """Padre nuestro, que estás en el cielo,
santificado sea tu Nombre;
venga a nosotros tu reino;
hágase tu voluntad
en la tierra como en el cielo.

Danos hoy nuestro pan de cada día;
perdona nuestras ofensas,
como también nosotros perdonamos
a los que nos ofenden;
no nos dejes caer en la tentación,
y líbranos del mal.

Amén.""",
        },
        "it": {
            "title": "Padre Nostro",
            "category": "traditional",
            "content": """Padre nostro, che sei nei cieli,
sia santificato il tuo nome,
venga il tuo regno,
sia fatta la tua volontà,
come in cielo così in terra.

Dacci oggi il nostro pane quotidiano,
e rimetti a noi i nostri debiti
come noi li rimettiamo
ai nostri debitori,
e non ci indurre in tentazione,
ma liberaci dal male.

Amen.""",
        },
    },
    "hail_mary": {
        "pt": {
            "title": "Ave Maria",
            "category": "traditional",
            "content": """Ave Maria, cheia de graça,
o Senhor é convosco,
bendita sois vós entre as mulheres
e bendito é o fruto do vosso ventre, Jesus.

Santa Maria, Mãe de Deus,
rogai por nós pecadores,
agora e na hora da nossa morte.

Amém.""",
        },
        "en": {
            "title": "Hail Mary",
            "category": "traditional",
            "content": """Hail Mary, full of grace,
the Lord is with thee;
blessed art thou among women,
and blessed is the fruit of thy womb, Jesus.

Holy Mary, Mother of God,
pray for us sinners,
now and at the hour of our death.

Amen.""",
        },
        "es": {
            "title": "Ave María",
            "category": "traditional",
            "content": """Dios te salve, María,
llena eres de gracia;
el Señor es contigo;
bendita Tú eres entre todas las mujeres,
y bendito es el fruto de tu vientre, Jesús.

Santa María, Madre de Dios,
ruega por nosotros, pecadores,
ahora y en la hora de nuestra muerte.

Amén.""",
        },
        "it": {
            "title": "Ave Maria",
            "category": "traditional",
            "content": """Ave, o Maria, piena di grazia,
il Signore è con te.
Tu sei benedetta fra le donne
e benedetto è il frutto del tuo seno, Gesù.

Santa Maria, Madre di Dio,
prega per noi peccatori,
adesso e nell'ora della nostra morte.

Amen.""",
        },
    },
    "glory_be": {
        "pt": {
            "title": "Glória ao Pai",
            "category": "traditional",
            "content": """Glória ao Pai e ao Filho e ao Espírito Santo.
Como era no princípio, agora e sempre.

Amém.""",
        },
        "en": {
            "title": "Glory Be",
            "category": "traditional",
            "content": """Glory be to the Father,
and to the Son,
and to the Holy Spirit.

As it was in the beginning,
is now, and ever shall be,
world without end.

Amen.""",
        },
        "es": {
            "title": "Gloria al Padre",
            "category": "traditional",
            "content": """Gloria al Padre, y al Hijo,
y al Espíritu Santo.

Como era en el principio,
ahora y siempre,
por los siglos de los siglos.

Amén.""",
        },
        "it": {
            "title": "Gloria al Padre",
            "category": "traditional",
            "content": """Gloria al Padre e al Figlio
e allo Spirito Santo.

Come era nel principio,
e ora e sempre
nei secoli dei secoli.

Amen.""",
        },
    },
    "st_joseph_novena": {
        "pt": {
            "title": "Novena de São José",
            "category": "novena",
            "content": """Ó glorioso São José,
escolhido por Deus para ser o pai putativo de Jesus,
o puríssimo esposo da Virgem Maria,
o chefe da Sagrada Família,
o protetor da Igreja de Cristo;

vós que fostes escolhido por Deus
para ser o guardião e defensor de Jesus e Maria,
ajudai-nos em nossas necessidades
e protegei-nos em todos os perigos.

Alcançai-nos a graça de viver santamente
e de morrer na graça de Deus.

Amém.""",
        },
        "en": {
            "title": "Novena to St. Joseph",
            "category": "novena",
            "content": """O glorious St. Joseph,
chosen by God to be the foster father of Jesus,
the most pure spouse of the Virgin Mary,
and the head of the Holy Family;

you who were chosen by God
to be the guardian and protector of Jesus and Mary,
help us in our needs
and protect us from all dangers.

Obtain for us the grace to live holy lives
and to die in the grace of God.

Amen.""",
        },
        "es": {
            "title": "Novena a San José",
            "category": "novena",
            "content": """Oh glorioso San José,
elegido por Dios para ser el padre putativo de Jesús,
el castísimo esposo de la Virgen María,
y el jefe de la Sagrada Familia;

tú que fuiste elegido por Dios
para ser el guardián y protector de Jesús y María,
ayúdanos en nuestras necesidades
y protégenos de todos los peligros.

Alcánzanos la gracia de vivir santamente
y de morir en la gracia de Dios.

Amén.""",
        },
        "it": {
            "title": "Novena a San Giuseppe",
            "category": "novena",
            "content": """O glorioso San Giuseppe,
scelto da Dio per essere il padre putativo di Gesù,
il castissimo sposo della Vergine Maria,
e il capo della Sacra Famiglia;

tu che fosti scelto da Dio
per essere il custode e protettore di Gesù e Maria,
aiutaci nelle nostre necessità
e proteggici da tutti i pericoli.

Ottienici la grazia di vivere santamente
e di morire nella grazia di Dio.

Amen.""",
        },
    },
    "immaculate_conception": {
        "pt": {
            "title": "Ofício da Imaculada Conceição",
            "category": "devotion",
            "content": """Ó Maria, concebida sem pecado original,
rogai por nós que recorremos a vós.

Vós sois, ó Maria, a Imaculada Conceição,
a escolhida de Deus desde toda a eternidade
para ser a Mãe do Salvador.

Vós fostes preservada de toda mancha de pecado
e cheia de graça e de bênçãos.

Rogai por nós, agora e na hora da nossa morte.

Amém.""",
        },
        "en": {
            "title": "Office of the Immaculate Conception",
            "category": "devotion",
            "content": """O Mary, conceived without original sin,
pray for us who have recourse to thee.

You are, O Mary, the Immaculate Conception,
chosen by God from all eternity
to be the Mother of the Savior.

You were preserved from all stain of sin
and filled with grace and blessings.

Pray for us, now and at the hour of our death.

Amen.""",
        },
        "es": {
            "title": "Oficio de la Inmaculada Concepción",
            "category": "devotion",
            "content": """Oh María, concebida sin pecado original,
ruega por nosotros que recurrimos a ti.

Tú eres, oh María, la Inmaculada Concepción,
elegida por Dios desde toda la eternidad
para ser la Madre del Salvador.

Fuiste preservada de toda mancha de pecado
y llena de gracia y bendiciones.

Ruega por nosotros, ahora y en la hora de nuestra muerte.

Amén.""",
        },
        "it": {
            "title": "Officio dell'Immacolata Concezione",
            "category": "devotion",
            "content": """O Maria, concepita senza peccato originale,
prega per noi che ricorriamo a te.

Tu sei, o Maria, l'Immacolata Concezione,
scelta da Dio da tutta l'eternità
per essere la Madre del Salvatore.

Fosti preservata da ogni macchia di peccato
e colma di grazia e benedizioni.

Prega per noi, adesso e nell'ora della nostra morte.

Amen.""",
        },
    },
    "act_of_contrition": {
        "pt": {
            "title": "Ato de Contrição",
            "category": "traditional",
            "content": """Meu Deus,
eu me arrependo de todo o coração
de vos ter ofendido,
porque sois infinitamente bom e amável,
e porque o pecado vos desagrada.

Proponho, com a vossa graça,
não mais pecar e fugir das ocasiões de pecado.

Amém.""",
        },
        "en": {
            "title": "Act of Contrition",
            "category": "traditional",
            "content": """O my God,
I am heartily sorry for having offended Thee,
and I detest all my sins,
because I dread the loss of heaven and the pains of hell,
but most of all because they offend Thee, my God,
who art all-good and deserving of all my love.

I firmly resolve, with Thy help,
to sin no more and to avoid the near occasions of sin.

Amen.""",
        },
        "es": {
            "title": "Acto de Contrición",
            "category": "traditional",
            "content": """Dios mío,
me arrepiento de todo corazón
de haberte ofendido,
porque eres infinitamente bueno y amable,
y porque el pecado te desagrada.

Propongo, con tu gracia,
no pecar más y huir de las ocasiones de pecado.

Amén.""",
        },
        "it": {
            "title": "Atto di Dolore",
            "category": "traditional",
            "content": """Mio Dio,
mi pento con tutto il cuore
di averti offeso,
perché sei infinitamente buono e amabile,
e perché il peccato ti dispiace.

Propongo, con la tua grazia,
di non peccare più e di fuggire le occasioni di peccato.

Amen.""",
        },
    },
    "angelus": {
        "pt": {
            "title": "Angelus",
            "category": "traditional",
            "content": """V. O Anjo do Senhor anunciou a Maria.
R. E ela concebeu do Espírito Santo.

Ave Maria...

V. Eis aqui a serva do Senhor.
R. Faça-se em mim segundo a vossa palavra.

Ave Maria...

V. E o Verbo se fez carne.
R. E habitou entre nós.

Ave Maria...

V. Rogai por nós, santa Mãe de Deus.
R. Para que sejamos dignos das promessas de Cristo.

Oremos:
Infundi, Senhor, a vossa graça em nossas almas,
para que, conhecendo pela anunciação do Anjo
a Encarnação de vosso Filho Jesus Cristo,
cheguemos, por sua Paixão e Cruz,
à glória da Ressurreição.

Pelo mesmo Cristo, Senhor nosso.
Amém.""",
        },
        "en": {
            "title": "The Angelus",
            "category": "traditional",
            "content": """V. The Angel of the Lord declared unto Mary.
R. And she conceived of the Holy Spirit.

Hail Mary...

V. Behold the handmaid of the Lord.
R. Be it done unto me according to thy word.

Hail Mary...

V. And the Word was made flesh.
R. And dwelt among us.

Hail Mary...

V. Pray for us, O holy Mother of God.
R. That we may be made worthy of the promises of Christ.

Let us pray:
Pour forth, we beseech Thee, O Lord,
Thy grace into our hearts;
that we, to whom the Incarnation of Christ, Thy Son,
was made known by the message of an Angel,
may by His Passion and Cross
be brought to the glory of His Resurrection.

Through the same Christ our Lord.
Amen.""",
        },
        "es": {
            "title": "El Ángelus",
            "category": "traditional",
            "content": """V. El Ángel del Señor anunció a María.
R. Y concibió por obra del Espíritu Santo.

Dios te salve, María...

V. He aquí la esclava del Señor.
R. Hágase en mí según tu palabra.

Dios te salve, María...

V. Y el Verbo se hizo carne.
R. Y habitó entre nosotros.

Dios te salve, María...

V. Ruega por nosotros, Santa Madre de Dios.
R. Para que seamos dignos de alcanzar las promesas de Nuestro Señor Jesucristo.

Oremos:
Infunde, Señor, tu gracia en nuestras almas,
para que los que hemos conocido, por el anuncio del Ángel,
la Encarnación de tu Hijo Jesucristo,
lleguemos por su Pasión y su Cruz
a la gloria de la Resurrección.

Por Jesucristo Nuestro Señor.
Amén.""",
        },
        "it": {
            "title": "L'Angelus",
            "category": "traditional",
            "content": """V. L'Angelo del Signore annunziò a Maria.
R. Ed Ella concepì per opera dello Spirito Santo.

Ave, Maria...

V. Ecco l'ancella del Signore.
R. Si compia in me la tua parola.

Ave, Maria...

V. E il Verbo si fece carne.
R. E venne ad abitare in mezzo a noi.

Ave, Maria...

V. Prega per noi, santa Madre di Dio.
R. Affinché siamo fatti degni delle promesse di Cristo.

Preghiamo:
Infondi nel nostro spirito la tua grazia, o Padre;
tu, che nell'annunzio dell'angelo
ci hai rivelato l'incarnazione del tuo Figlio,
conducici per la sua passione e la sua croce
alla gloria della risurrezione.

Per Cristo nostro Signore.
Amen.""",
        },
    },
}


@router.get("/", response_model=dict)
async def get_prayers(
    lang: Language = Query(Language.PORTUGUESE, description="Language code: pt, en, es, it"),
    category: Optional[str] = Query(None, description="Filter by category: traditional, devotion, novena"),
):
    """
    Get Catholic prayers in the specified language.

    - **lang**: Language code (pt, en, es, it)
    - **category**: Optional category filter
    """
    prayers = []

    for prayer_id, translations in PRAYERS_DB.items():
        if lang.value in translations:
            prayer_data = translations[lang.value]

            if category and prayer_data.get("category") != category:
                continue

            prayers.append(
                Prayer(
                    id=prayer_id,
                    title=prayer_data["title"],
                    language=lang,
                    category=prayer_data["category"],
                    content=prayer_data["content"],
                ).model_dump(mode="json")
            )

    return {
        "success": True,
        "data": prayers,
        "count": len(prayers),
    }


@router.get("/{prayer_id}", response_model=dict)
async def get_prayer(
    prayer_id: str,
    lang: Language = Query(Language.PORTUGUESE, description="Language code: pt, en, es, it"),
):
    """Get a specific prayer by ID in the specified language."""
    if prayer_id not in PRAYERS_DB:
        raise HTTPException(status_code=404, detail=f"Prayer '{prayer_id}' not found")

    translations = PRAYERS_DB[prayer_id]
    if lang.value not in translations:
        raise HTTPException(status_code=404, detail=f"Prayer not available in {lang.value}")

    prayer_data = translations[lang.value]

    return {
        "success": True,
        "data": Prayer(
            id=prayer_id,
            title=prayer_data["title"],
            language=lang,
            category=prayer_data["category"],
            content=prayer_data["content"],
        ).model_dump(mode="json"),
    }


@router.get("/categories", response_model=dict)
async def get_prayer_categories():
    """Get all available prayer categories."""
    categories = set()
    for translations in PRAYERS_DB.values():
        for lang_data in translations.values():
            categories.add(lang_data.get("category", "other"))

    return {
        "success": True,
        "data": sorted(list(categories)),
    }
