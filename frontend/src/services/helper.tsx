const aamupala = {
    "leipa": {
        "kauraleipä": "1",
        "näkkileipä": "6",
        "ruisleipä": "8",
        "karjalanpiirakka": "12"
    },
    "juoma": {
        "vesi": "1",
        "maito": "2",
        "mehu": "3"
    },
    "hedelmat_marjat": {
        "mustikka": "1",
        "omena": "2",
        "banaani": "3"
    }
};

const perhe = {
    "lapset": {
        "Veeti": "1",
        "Oona": "2",
    }
}

const tapahtumat = [
    {
      "08:30": {
        "1": "Aamiainen",
        "klo": "7.30-8.30"
      }
    },
    {
      "10:30": {
        "2": "Aktiviteetti",
        "klo": "8.30-10.30"
      }
    },
    {
      "11:30": {
        "3": "Lounas",
        "klo": "10.30-11.30"
      }
    },
    {
      "14:00": {
        "4": "Päiväunet",
        "klo": "12.00-14.00"
      }
    },
    {
      "14:15": {
        "5": "Välipala",
        "klo": "14.00-14.15"
      }
    },
    {
      "17:30": {
        "6": "Päivällinen",
        "klo": "17.00-17.30"
      }
    },
    {
      "18:00": {
        "7": "Aktiviteetti",
        "klo": "17.15-18.00"
      }
    },
    {
      "19:00": {
        "8": "Iltapala ja iltatoimet",
        "klo": "18.00-19.00"
      }
    },
    {
      "20:00": {
        "9": "Hyvää yötä",
        "klo": "19.00-20.00"
      }
    }
  ];

const aktiviteetit = {
  "22022023": {
    "nimi": "päiväuni",
    "tyyppi": "lepo",
    "kesto": "1",
    "paikka": "koti",
    "suosikki": true
  },
  "23022023": {
    "nimi": "päiväuni",
    "tyyppi": "lepo",
    "kesto": "1",
    "paikka": "koti",
    "suosikki": true
  }
}

const ateriat = {
  "22022023-08": {
    "nimi": "aamupala",
    "tyyppi": "aamupala",
    "kategoria": {"puuro":"1"},
    "kesto": "1",
    "paikka": "koti",
    "suosikki": true
  },
  "22022023-11": {
    "nimi": "lounas",
    "tyyppi": "lounas",
    "kategoria": {"leipä":"2"},
    "kesto": "1",
    "paikka": "koti",
    "suosikki": true
}
}
  


export { aamupala, perhe, tapahtumat, ateriat, aktiviteetit };