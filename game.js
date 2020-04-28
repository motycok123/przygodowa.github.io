const textElement = document.getElementById('tekst')
const optionButtonsElement = document.getElementById('opcje')

let state = {}

function startGry() {
  state = {}
  pokazTekst(1)
}

function pokazTekst(textNodeIndex) {
  const textNode = textNodes.find(textNode => textNode.id === textNodeIndex)
  textElement.innerText = textNode.text
  while (optionButtonsElement.firstChild) {
    optionButtonsElement.removeChild(optionButtonsElement.firstChild)
  }

  textNode.options.forEach(option => {
    if (pokazOpcje(option)) {
      const button = document.createElement('button')
      button.innerText = option.text
      button.classList.add('btn')
      button.addEventListener('click', () => wybierzOpcje(option))
      optionButtonsElement.appendChild(button)
    }
  })
}

function pokazOpcje(option) {
  return option.requiredState == null || option.requiredState(state)
}

function wybierzOpcje(option) {
  const nextTextNodeId = option.nextText
  if (nextTextNodeId <= 0) {
    return startGry()
  }
  state = Object.assign(state, option.setState)
  pokazTekst(nextTextNodeId)
}

const textNodes = [
  {
    id: 1,
    text: 'Obudziłeś się w zamku i widzisz skrzynię pełną złota.',
    options: [
      {
        text: 'Weź złoto. ',
        setState: { złoto: true },
        nextText: 2
      },
      {
        text: 'Zostaw złoto.',
        nextText: 2
      }
    ]
  },
  {
    id: 2,
    text: 'Szukając wyjścia z zamku spotykasz kupca.',
    options: [
      {
        text: 'Wymień złoto za miecz.',
        requiredState: (currentState) => currentState.złoto,
        setState: { złoto: false, miecz: true },
        nextText: 3
      },
      {
        text: 'Wymień złoto za tarczę.',
        requiredState: (currentState) => currentState.złoto,
        setState: { złoto: false, tarcza: true },
        nextText: 3
      },
      {
        text: 'Zignoruj kupca.',
        nextText: 3
      }
    ]
  },
  {
    id: 3,
    text: 'Teraz zastanawiasz się jak wydostać sięz zamku.',
    options: [
      {
        text: 'Zrób linę z prześcieradła i zjedź na niej przez okno.',
        nextText: 4
      },
      {
        text: 'Udaj się do komnaty króla by poprosić o pomoc.',
        nextText: 5
      },
      {
        text: 'Przejdź się po zamku w poszukiwaniu pomocy.',
        nextText: 6
      }
    ]
  },
  {
    id: 4,
    text: 'Gdy zjeżdżałeś po linie lina urwała się a ty spadłeś z dużej wysokości i umarłeś.',
    options: [
      {
        text: 'Restart',
        nextText: -1
      }
    ]
  },
  {
    id: 5,
    text: 'Gdy tylko zbliżyłeś się do komnaty króla strażnicy zaatakowali cię i zabili.',
    options: [
      {
        text: 'Restart',
        nextText: -1
      }
    ]
  },
  {
    id: 6,
    text: 'Eksplorując zamek na twojej drodze ukazał się potwór, jednak nie jesteś stracony.',
    options: [
      {
        text: 'Stań do walki.',
        nextText: 7
      }
    ]
  },
  {
    id: 7,
    text: 'Podchodzisz do walki z potworem.',
    options: [
      {
        text: 'Spróbuj uciec.',
        nextText: 8
      },
      {
        text: 'Zaatakuj go mieczem.',
        requiredState: (currentState) => currentState.miecz,
        nextText: 9
      },
      {
        text: 'Schowaj się za tarczą.',
        requiredState: (currentState) => currentState.tarcza,
        nextText: 10
      },
      {
        text: 'Rzuć złotem w potwora.',
        requiredState: (currentState) => currentState.złoto,
        nextText: 11
      }
    ]
  },
  {
    id: 8,
    text: 'Twoja ucieczka poszła na marne, potwór z łatwością cię dogonił.',
    options: [
      {
        text: 'restart',
        nextText: -1
      }
    ]
  },
  {
    id: 9,
    text: 'Twój miecz nie robiżadnych obrażeń.',
    options: [
      {
        text: 'restart',
        nextText: -1
      }
    ]
  },
  {
    id: 10,
    text: 'Potwór podszedł do ciebie wyrwał ci tarcze z dłoni i połknął cię w całości.',
    options: [
      {
        text: 'restart',
        nextText: -1
      }
    ]
  },
  {
    id: 11,
    text: 'Potwór rzucił się na złoto a ty przemknąłeś po cichu obok niego i udało ci się wyjść z zamku.',
    options: [
      {
        text: 'Gratulacje. Zagraj ponownie',
        nextText: -1
      }
    ]
  }
]
startGry()