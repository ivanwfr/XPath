// ┌───────────────────────────────────────────────────────────────────────────┐
// │ taxo_json.js ========= CONTENT SCRIPT ========== _TAG (220106:16h:00) === │
// └───────────────────────────────────────────────────────────────────────────┘
/* jshint esversion: 9, laxbreak:true, laxcomma:true, boss:true */ /*{{{*/
/* exported TAXO_JSON_JS_TAG, taxo_json */

/* eslint-disable no-irregular-whitespace */

/*}}}*/
const TAXO_JSON_JS_ID   = "taxo_json";
const TAXO_JSON_JS_TAG  =  TAXO_JSON_JS_ID  +" (201112:22h:59)";
let   taxo_json         = (function() {
"use strict";

// ┌───────────────────────────────────────────────────────────────────────────┐
// │ JSON .. [DESERIALIZE TAXONOMY DATA] ..................................... │
// │                                                                           │
// │  - code        .. to be renamed as [id]                                   │
// │                                                                           │
// │  - description                                                            │
// │  - children    .. to be renamed as [list]                                 │
// │                                                                           │
// └───────────────────────────────────────────────────────────────────────────┘
return JSON.parse(
/*{{{*/

`
{
 "id": "ALL",
 "description": "All",
 "list": [
  {
   "id": "OTHER",
   "description": "(Autres)",
   "list": []
  },
  {
   "id": "GDPR",
   "description": "(RGPD, cookies, privacité,etc)",
   "list": []
  },
  {
   "id": "AUTOMOTIVE",
   "description": "(Automotion)",
   "list": [
    {
     "id": "BRAND",
     "description": "(Marque)",
     "list": []
    },
    {
     "id": "RETAILER",
     "description": "(Distributeur)",
     "list": []
    },
    {
     "id": "EV_CARS",
     "description": "(voitures électriques)",
     "list": []
    },
    {
     "id": "BATTERIES_EV",
     "description": "(Batteries Véhicules électriques)",
     "list": []
    },
    {
     "id": "OIL_CARS",
     "description": "(voitures diesel, essence)",
     "list": []
    },
    {
     "id": "EV_TRUCKS",
     "description": "(Pickups électriques)",
     "list": []
    },
    {
     "id": "OIL_TRUCKS",
     "description": "(Pickups diesel, essence)",
     "list": []
    },
    {
     "id": "TRIMS",
     "description": "(intérieur, cuir, tissu)",
     "list": []
    },
    {
     "id": "CAR_CARE",
     "description": "(packages d’assistance/assurance/maintenance, etc…)",
     "list": []
    },
    {
     "id": "CAR_ELECTRONICS",
     "description": "(options type GPS, écran tactile, caméra, conduite autom…)",
     "list": []
    },
    {
     "id": "PACKAGES",
     "description": "(versions : full options, ou autre package regroupant des options – cuir, aide au parking, etc…)",
     "list": []
    },
    {
     "id": "LIGHTS",
     "description": "(lumières, phares, antibrouillard, tout ce qui ce réfère aux optiques)",
     "list": []
    },
    {
     "id": "TIRES_WHEELS",
     "description": "(pneus et jantes)",
     "list": []
    },
    {
     "id": "MOTORCYCLE",
     "description": "(Motos)",
     "list": []
    }
   ]
  },
  {
   "id": "BEAUTY",
   "description": "(Beauté)",
   "list": [
    {
     "id": "BRAND_1",
     "description": "(Marque)",
     "list": []
    },
    {
     "id": "RETAILER_1",
     "description": "(Distributeur)",
     "list": []
    },
    {
     "id": "LIPSTICK",
     "description": "(rouge à lèvres de toutes les couleurs !)",
     "list": []
    },
    {
     "id": "PERFUME",
     "description": "Parfums",
     "list": []
    },
    {
     "id": "MASCARA",
     "description": "",
     "list": []
    },
    {
     "id": "LIP_GLOSS",
     "description": "(Gloss se dit en français aussi, ça fait briller les lèvres !)",
     "list": []
    },
    {
     "id": "EYES",
     "description": "(pour les paupières, les cils, les sourcils)",
     "list": []
    },
    {
     "id": "SKIN_CARE_CREAM",
     "description": "(Crème de soins pour la peau)",
     "list": []
    },
    {
     "id": "MOISTURISER",
     "description": "(crème hydratante)",
     "list": []
    },
    {
     "id": "HAND_CREAM",
     "description": " (crème pour les mains)",
     "list": []
    },
    {
     "id": "SHAMPOO",
     "description": "(Shampoing)",
     "list": []
    },
    {
     "id": "BLUSH",
     "description": "(fond de teint)",
     "list": []
    },
    {
     "id": "SOAP",
     "description": "(Savon)",
     "list": []
    },
    {
     "id": "BATH_OIL",
     "description": "(Huile de bain)",
     "list": []
    },
    {
     "id": "SHAVING_CREAM",
     "description": "(Crème à raser)",
     "list": []
    },
    {
     "id": "SHOWER_GEL",
     "description": "(Gel douche)",
     "list": []
    },
    {
     "id": "BODY_LOTION",
     "description": "(Lotion Corporelle)",
     "list": []
    },
    {
     "id": "CLEANSERS_MAKEUP_REMOVERS_TONERS",
     "description": "(nettoyage de peau, démaquillants, tonique)",
     "list": []
    },
    {
     "id": "FOUNDATIONS",
     "description": "(bases teint)",
     "list": []
    },
    {
     "id": "FRAGRANCE_PERFUME",
     "description": "(parfum)",
     "list": []
    },
    {
     "id": "HEALTHY_GLOW_MAKEUP",
     "description": "(glow lèvres santé)",
     "list": []
    },
    {
     "id": "LIP_PENCILS",
     "description": "(crayons contours lèvres)",
     "list": []
    },
    {
     "id": "NAIL_COLOUR",
     "description": "(couleurs vernis ongles)",
     "list": []
    },
    {
     "id": "PENCILS_LINERS_",
     "description": "(crayon pour les yeux)",
     "list": []
    },
    {
     "id": "SPECIFIC_CARE",
     "description": "Soins spécifiques rides, cou, contour des yeux",
     "list": []
    },
    {
     "id": "NAILS",
     "description": "Ongles, dissolvants, soins des ongles, base et top coat, faux ongles",
     "list": []
    },
    {
     "id": "APPLICATORS",
     "description": "applicateurs,pinceaux (teint, yeux, lèvres), kits pinceaux, éponges, ",
     "list": []
    },
    {
     "id": "BLACK_MULTIRACIAL_SKIN_CARE",
     "description": "Gamme Soins peaux noires et métisses",
     "list": []
    },
    {
     "id": "HAIR",
     "description": "Cheveux, frisés, crèmes cheveux",
     "list": []
    },
    {
     "id": "HAIR_COLOR",
     "description": "Coloration Cheveux, colorants (déclinaison de couleurs), soins colorants, coloration végétale, balayages, coloration éphémère, masques,",
     "list": []
    },
    {
     "id": "HAIR_STYLE",
     "description": "Produits coiffants, laque, gel, cire, spray, mousse, huiles et sérums",
     "list": []
    },
    {
     "id": "HAIR_HOLDERS",
     "description": "pinces et barrettes, chouchous, élastiqueset? bandeaux",
     "list": []
    },
    {
     "id": "HAIR_DRESSING",
     "description": "ciseaux,sèche cheveux",
     "list": []
    },
    {
     "id": "HAIR_ACCESSORIES",
     "description": "lisseurs, boucleurs, brosse lissante chauffante, bigoudis, rouleaux chauffants",
     "list": []
    },
    {
     "id": "BIO",
     "description": "",
     "list": []
    }
   ]
  },
  {
   "id": "FASHION",
   "description": "&#x1F460; (Mode)",
   "list": [
    {
     "id": "BRAND_2",
     "description": "(Marque)",
     "list": []
    },
    {
     "id": "RETAILER_2",
     "description": "(Distributeur)",
     "list": []
    },
    {
     "id": "BOTTOM_WEAR",
     "description": "",
     "list": [
      {
       "id": "BATHING_SUIT",
       "description": "",
       "list": [
        {
         "id": "BATHING_SUIT_MEN",
         "description": "",
         "list": []
        },
        {
         "id": "BATHING_SUIT_WOMEN",
         "description": "",
         "list": []
        },
        {
         "id": "BATHING_SUIT_CHILDREN",
         "description": "",
         "list": []
        }
       ]
      },
      {
       "id": "BIKINI",
       "description": "",
       "list": [
        {
         "id": "BIKINI_CHILDREN",
         "description": "",
         "list": []
        }
       ]
      },
      {
       "id": "PANTS",
       "description": "",
       "list": [
        {
         "id": "PANTS_MEN",
         "description": "",
         "list": []
        },
        {
         "id": "PANTS_WOMEN",
         "description": "",
         "list": []
        },
        {
         "id": "PANTS_CHILDREN",
         "description": "",
         "list": []
        }
       ]
      },
      {
       "id": "PYJAMA",
       "description": "",
       "list": [
        {
         "id": "PYJAMA_MEN",
         "description": "",
         "list": []
        },
        {
         "id": "PYJAMA_WOMEN",
         "description": "",
         "list": []
        },
        {
         "id": "PYJAMA_CHILDREN",
         "description": "",
         "list": []
        }
       ]
      },
      {
       "id": "SHORTS",
       "description": "",
       "list": [
        {
         "id": "SHORTS_MEN",
         "description": "",
         "list": []
        },
        {
         "id": "SHORTS_WOMEN",
         "description": "",
         "list": []
        },
        {
         "id": "SHORTS_CHILDREN",
         "description": "",
         "list": []
        }
       ]
      },
      {
       "id": "SKIRT",
       "description": "",
       "list": [
        {
         "id": "SKIRT_CHILDREN",
         "description": "",
         "list": []
        }
       ]
      },
      {
       "id": "SWEATPANTS",
       "description": "",
       "list": [
        {
         "id": "SWEATPANTS_MEN",
         "description": "",
         "list": []
        },
        {
         "id": "SWEATPANTS_WOMEN",
         "description": "",
         "list": []
        },
        {
         "id": "SWEATPANTS_CHILDREN",
         "description": "",
         "list": []
        }
       ]
      },
      {
       "id": "TRACKSUIT",
       "description": "(survêtement)",
       "list": [
        {
         "id": "TRACKSUIT_MEN",
         "description": "",
         "list": []
        },
        {
         "id": "TRACKSUIT_WOMEN",
         "description": "",
         "list": []
        },
        {
         "id": "TRACKSUIT_CHILDREN",
         "description": "",
         "list": []
        }
       ]
      },
      {
       "id": "STRETCHING_PANTS",
       "description": "(Pantalon extensible)",
       "list": [
        {
         "id": "STRETCHING_PANTS_MEN",
         "description": "",
         "list": []
        },
        {
         "id": "STRETCHING_PANTS_WOMEN",
         "description": "",
         "list": []
        },
        {
         "id": "STRETCHING_PANTS_CHILDREN",
         "description": "",
         "list": []
        }
       ]
      },
      {
       "id": "CORSAIRE",
       "description": "(Corsaire)",
       "list": [
        {
         "id": "CORSAIRE_MEN",
         "description": "",
         "list": []
        },
        {
         "id": "CORSAIRE_WOMEN",
         "description": "",
         "list": []
        },
        {
         "id": "CORSAIRE_CHILDREN",
         "description": "",
         "list": []
        }
       ]
      },
      {
       "id": "CYCLING_SHORTS",
       "description": " (short cycliste)",
       "list": [
        {
         "id": "CYCLING_SHORTS_MEN",
         "description": "",
         "list": []
        },
        {
         "id": "CYCLING_SHORTS_WOMEN",
         "description": "",
         "list": []
        },
        {
         "id": "CYCLING_SHORTS_CHILDREN",
         "description": "",
         "list": []
        }
       ]
      }
     ]
    },
    {
     "id": "FASHION_ACCESSORIES",
     "description": "(Accessoires de mode)",
     "list": [
      {
       "id": "BELT",
       "description": "(ceinture)",
       "list": [
        {
         "id": "BELT_MEN",
         "description": "",
         "list": []
        },
        {
         "id": "BELT_WOMEN",
         "description": "",
         "list": []
        },
        {
         "id": "BELT_CHILDREN",
         "description": "",
         "list": []
        }
       ]
      },
      {
       "id": "JEWELRY",
       "description": "(bijouterie)",
       "list": [
        {
         "id": "RING",
         "description": "(anneau)",
         "list": [
          {
           "id": "RING_MEN",
           "description": "",
           "list": []
          },
          {
           "id": "RING_WOMEN",
           "description": "",
           "list": []
          },
          {
           "id": "RING_CHILDREN",
           "description": "",
           "list": []
          }
         ]
        },
        {
         "id": "EARING",
         "description": "(boucle d'oreille)",
         "list": [
          {
           "id": "EARING_MEN",
           "description": "",
           "list": []
          },
          {
           "id": "EARING_WOMEN",
           "description": "",
           "list": []
          },
          {
           "id": "EARING_CHILDREN",
           "description": "",
           "list": []
          }
         ]
        },
        {
         "id": "BRACELET",
         "description": "",
         "list": []
        },
        {
         "id": "NECKLACE",
         "description": "(collier)",
         "list": [
          {
           "id": "NECKLACE_MEN",
           "description": "",
           "list": []
          },
          {
           "id": "NECKLACE_WOMEN",
           "description": "",
           "list": []
          },
          {
           "id": "NECKLACE_CHILDREN",
           "description": "",
           "list": []
          }
         ]
        }
       ]
      },
      {
       "id": "PURSE",
       "description": "(porte-monnaie/portefeuille)",
       "list": []
      },
      {
       "id": "SCARF",
       "description": "(écharpes)",
       "list": [
        {
         "id": "SCARF_MEN",
         "description": "",
         "list": []
        },
        {
         "id": "SCARF_WOMEN",
         "description": "",
         "list": []
        },
        {
         "id": "SCARF_CHILDREN",
         "description": "",
         "list": []
        }
       ]
      },
      {
       "id": "STOCKINGS",
       "description": "(bas pour femme)",
       "list": []
      },
      {
       "id": "SUNGLASSES",
       "description": "(lunettes de soleil)",
       "list": [
        {
         "id": "SUNGLASSES_MEN",
         "description": "",
         "list": []
        },
        {
         "id": "SUNGLASSES_WOMEN",
         "description": "",
         "list": []
        },
        {
         "id": "SUNGLASSES_CHILDREN",
         "description": "",
         "list": []
        }
       ]
      },
      {
       "id": "TIE",
       "description": "(cravate)",
       "list": []
      },
      {
       "id": "HANDBAG",
       "description": "(sac à mains)",
       "list": [
        {
         "id": "HANDBAG_MEN",
         "description": "",
         "list": []
        },
        {
         "id": "HANDBAG_WOMEN",
         "description": "",
         "list": []
        },
        {
         "id": "HANDBAG_CHILDREN",
         "description": "",
         "list": []
        }
       ]
      },
      {
       "id": "SOCKS",
       "description": "(chaussettes)",
       "list": [
        {
         "id": "SOCKS_MEN",
         "description": "",
         "list": []
        },
        {
         "id": "SOCKS_WOMEN",
         "description": "",
         "list": []
        },
        {
         "id": "SOCKS_CHILDREN",
         "description": "",
         "list": []
        }
       ]
      },
      {
       "id": "WATCHES",
       "description": "(montres)",
       "list": [
        {
         "id": "WATCHES_MEN",
         "description": "",
         "list": []
        },
        {
         "id": "WATCHES_WOMEN",
         "description": "",
         "list": []
        },
        {
         "id": "WATCHES_CHILDREN",
         "description": "",
         "list": []
        }
       ]
      }
     ]
    },
    {
     "id": "OUTER_WEAR",
     "description": "",
     "list": [
      {
       "id": "BLAZER",
       "description": "(veste croisée)",
       "list": [
        {
         "id": "BLAZER_MEN",
         "description": "",
         "list": []
        },
        {
         "id": "BLAZER_WOMEN",
         "description": "",
         "list": []
        },
        {
         "id": "BLAZER_CHILDREN",
         "description": "",
         "list": []
        }
       ]
      },
      {
       "id": "COAT",
       "description": "(manteau)",
       "list": [
        {
         "id": "COAT_MEN",
         "description": "",
         "list": []
        },
        {
         "id": "COAT_WOMEN",
         "description": "",
         "list": []
        },
        {
         "id": "COAT_CHILDREN",
         "description": "",
         "list": []
        }
       ]
      },
      {
       "id": "JACKET",
       "description": "(veste)",
       "list": [
        {
         "id": "JACKET_MEN",
         "description": "",
         "list": []
        },
        {
         "id": "JACKET_WOMEN",
         "description": "",
         "list": []
        },
        {
         "id": "JACKET_CHILDREN",
         "description": "",
         "list": []
        }
       ]
      },
      {
       "id": "SUIT",
       "description": "(costume)",
       "list": [
        {
         "id": "SUIT_MEN",
         "description": "",
         "list": []
        },
        {
         "id": "SUIT_WOMEN",
         "description": "",
         "list": []
        },
        {
         "id": "SUIT_CHILDREN",
         "description": "",
         "list": []
        }
       ]
      },
      {
       "id": "VEST",
       "description": "(gilet)",
       "list": [
        {
         "id": "VEST_MEN",
         "description": "",
         "list": []
        },
        {
         "id": "VEST_WOMEN",
         "description": "",
         "list": []
        },
        {
         "id": "VEST_CHILDREN",
         "description": "",
         "list": []
        }
       ]
      },
      {
       "id": "ROBE",
       "description": "",
       "list": []
      }
     ]
    },
    {
     "id": "UPPER_WEAR",
     "description": "",
     "list": [
      {
       "id": "BLOUSE",
       "description": "(chemisier)",
       "list": [
        {
         "id": "BLOUSE_MEN",
         "description": "",
         "list": []
        },
        {
         "id": "BLOUSE_WOMEN",
         "description": "",
         "list": []
        },
        {
         "id": "BLOUSE_CHILDREN",
         "description": "",
         "list": []
        }
       ]
      },
      {
       "id": "SHIRT",
       "description": "(chemise)",
       "list": [
        {
         "id": "SHIRT_MEN",
         "description": "",
         "list": []
        },
        {
         "id": "SHIRT_WOMEN",
         "description": "",
         "list": []
        },
        {
         "id": "SHIRT_CHILDREN",
         "description": "",
         "list": []
        }
       ]
      },
      {
       "id": "SWEATER",
       "description": "(pull)",
       "list": [
        {
         "id": "SWEATER_MEN",
         "description": "",
         "list": []
        },
        {
         "id": "SWEATER_WOMEN",
         "description": "",
         "list": []
        },
        {
         "id": "SWEATER_CHILDREN",
         "description": "",
         "list": []
        }
       ]
      },
      {
       "id": "SWEATSHIRT",
       "description": "(maillot de corps)",
       "list": [
        {
         "id": "SWEATSHIRT_MEN",
         "description": "",
         "list": []
        },
        {
         "id": "SWEATSHIRT_WOMEN",
         "description": "",
         "list": []
        },
        {
         "id": "SWEATSHIRT_CHILDREN",
         "description": "",
         "list": []
        }
       ]
      },
      {
       "id": "T_SHIRT",
       "description": "",
       "list": [
        {
         "id": "T_SHIRT_MEN",
         "description": "",
         "list": []
        },
        {
         "id": "T_SHIRT_WOMEN",
         "description": "",
         "list": []
        },
        {
         "id": "T_SHIRT_CHILDREN",
         "description": "",
         "list": []
        }
       ]
      },
      {
       "id": "TANK_TOP",
       "description": "(débardeur ou assimilés)",
       "list": [
        {
         "id": "TANK_TOP_WOMEN",
         "description": "",
         "list": []
        },
        {
         "id": "TANK_TOP_CHILDREN",
         "description": "",
         "list": []
        }
       ]
      },
      {
       "id": "POLO",
       "description": "",
       "list": [
        {
         "id": "POLO_MEN",
         "description": "",
         "list": []
        },
        {
         "id": "POLO_WOMEN",
         "description": "",
         "list": []
        },
        {
         "id": "POLO_CHILDREN",
         "description": "",
         "list": []
        }
       ]
      },
      {
       "id": "DRESS",
       "description": "(robes)",
       "list": [
        {
         "id": "DRESS_WOMEN",
         "description": "",
         "list": []
        },
        {
         "id": "DRESS_CHILDREN",
         "description": "",
         "list": []
        }
       ]
      }
     ]
    },
    {
     "id": "FOOT_WEAR",
     "description": "",
     "list": [
      {
       "id": "BOOTS",
       "description": "",
       "list": [
        {
         "id": "BOOTS_MEN",
         "description": "",
         "list": []
        },
        {
         "id": "BOOTS_WOMEN",
         "description": "",
         "list": []
        },
        {
         "id": "BOOTS_CHILDREN",
         "description": "",
         "list": []
        }
       ]
      },
      {
       "id": "SANDALS",
       "description": "(sandales)",
       "list": [
        {
         "id": "SANDALS_MEN",
         "description": "",
         "list": []
        },
        {
         "id": "SANDALS_WOMEN",
         "description": "",
         "list": []
        },
        {
         "id": "SANDALS_CHILDREN",
         "description": "",
         "list": []
        }
       ]
      },
      {
       "id": "SHOES",
       "description": "(chaussures)",
       "list": [
        {
         "id": "SHOES_MEN",
         "description": "",
         "list": [
          {
           "id": "MONK_STRAPS",
           "description": "",
           "list": []
          },
          {
           "id": "DERBY",
           "description": "",
           "list": []
          },
          {
           "id": "OXFORD",
           "description": "",
           "list": []
          },
          {
           "id": "LOAFERS",
           "description": "(mocassins)",
           "list": []
          }
         ]
        },
        {
         "id": "SHOES_WOMEN",
         "description": "",
         "list": [
          {
           "id": "PUMPS",
           "description": " (escarpins)",
           "list": []
          },
          {
           "id": "BALLET_SHOES",
           "description": " (ballerines)",
           "list": []
          }
         ]
        },
        {
         "id": "HIKING",
         "description": " (randonnée)",
         "list": [
          {
           "id": "HIKING_MEN",
           "description": "",
           "list": []
          },
          {
           "id": "HIKING_WOMEN",
           "description": "",
           "list": []
          },
          {
           "id": "HIKING_CHILDREN",
           "description": "",
           "list": []
          }
         ]
        },
        {
         "id": "SHOES_CHILDREN",
         "description": "",
         "list": []
        }
       ]
      },
      {
       "id": "SLIPPERS",
       "description": "(chaussons)",
       "list": [
        {
         "id": "SLIPPERS_MEN",
         "description": "",
         "list": []
        },
        {
         "id": "SLIPPERS_WOMEN",
         "description": "",
         "list": []
        },
        {
         "id": "SLIPPERS_CHILDREN",
         "description": "",
         "list": []
        }
       ]
      },
      {
       "id": "SNEAKER",
       "description": "(chaussure de sports)",
       "list": [
        {
         "id": "SNEAKER_MEN",
         "description": "",
         "list": []
        },
        {
         "id": "SNEAKER_WOMEN",
         "description": "",
         "list": []
        },
        {
         "id": "SNEAKER_CHILDREN",
         "description": "",
         "list": []
        }
       ]
      }
     ]
    },
    {
     "id": "HEAD_WEAR",
     "description": "",
     "list": [
      {
       "id": "HAT",
       "description": "(chapeau)",
       "list": []
      },
      {
       "id": "BONNET",
       "description": "(bonnet)",
       "list": []
      },
      {
       "id": "CAP",
       "description": "(casquette)",
       "list": []
      }
     ]
    },
    {
     "id": "UNDER_WEAR",
     "description": "",
     "list": [
      {
       "id": "UNDER_WEAR_WOMEN",
       "description": "",
       "list": [
        {
         "id": "LINGERIE",
         "description": "",
         "list": [
          {
           "id": "NIGHT_LINGERIE",
           "description": "(lingerie de nuit)",
           "list": []
          },
          {
           "id": "EROTIC_LINGERIE",
           "description": "(lingerie érotique)",
           "list": []
          }
         ]
        },
        {
         "id": "BRA",
         "description": "(Soutien-gorge)",
         "list": []
        },
        {
         "id": "PANTIES",
         "description": " (culottes)",
         "list": []
        },
        {
         "id": "BODY",
         "description": " (body)",
         "list": []
        },
        {
         "id": "BABYDOLL",
         "description": "(nuisette)",
         "list": []
        }
       ]
      }
     ]
    },
    {
     "id": "BODY_WEAR",
     "description": "",
     "list": [
      {
       "id": "BEACHWEAR",
       "description": "(mode plage)",
       "list": [
        {
         "id": "BEACHWEAR_MEN",
         "description": "",
         "list": []
        },
        {
         "id": "BEACHWEAR_WOMEN",
         "description": "",
         "list": []
        },
        {
         "id": "BEACHWEAR_CHILDREN",
         "description": "",
         "list": []
        }
       ]
      },
      {
       "id": "CORSET",
       "description": "(sous-vêtements)",
       "list": []
      },
      {
       "id": "ENSEMBLES",
       "description": "",
       "list": [
        {
         "id": "ENSEMBLES_MEN",
         "description": "",
         "list": []
        },
        {
         "id": "ENSEMBLES_WOMEN",
         "description": "",
         "list": []
        },
        {
         "id": "ENSEMBLES_CHILDREN",
         "description": "",
         "list": []
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "FOOD",
   "description": "(Nourriture)",
   "list": [
    {
     "id": "BRAND_3",
     "description": "(Marque)",
     "list": []
    },
    {
     "id": "RETAILER_3",
     "description": "(Distributeur)",
     "list": []
    },
    {
     "id": "WINE",
     "description": "(vin)",
     "list": []
    },
    {
     "id": "MEAT",
     "description": "(viande)",
     "list": []
    },
    {
     "id": "FRUITS",
     "description": "",
     "list": []
    },
    {
     "id": "FISH",
     "description": "(poisson)",
     "list": []
    },
    {
     "id": "ALCOHOL",
     "description": "(alcool)",
     "list": []
    },
    {
     "id": "COOKIES",
     "description": "((petit gâteaux en tout genre)",
     "list": []
    },
    {
     "id": "ORGANIC",
     "description": "(bio, nourriture bio)",
     "list": []
    },
    {
     "id": "DAIRY",
     "description": "(laitages - périssables)",
     "list": []
    },
    {
     "id": "BEEF",
     "description": "(boeuf)",
     "list": []
    },
    {
     "id": "CHIPS",
     "description": "(frites et chips)",
     "list": []
    },
    {
     "id": "BREAD",
     "description": "(pain)",
     "list": []
    },
    {
     "id": "JUICE",
     "description": "(jus de fruits)",
     "list": []
    },
    {
     "id": "CEREAL",
     "description": "(céréales)",
     "list": []
    },
    {
     "id": "SEAFOOD",
     "description": "(fruits de mer)",
     "list": []
    },
    {
     "id": "YOGURT",
     "description": "(yaourt)",
     "list": []
    },
    {
     "id": "FROZEN_FOOD",
     "description": "(surgelés)",
     "list": []
    },
    {
     "id": "BEER",
     "description": "(bière)",
     "list": []
    },
    {
     "id": "BEVERAGE",
     "description": "(boissons)",
     "list": []
    },
    {
     "id": "POULTRY",
     "description": "(volaille)",
     "list": []
    },
    {
     "id": "VEGETALES",
     "description": "(légumes)",
     "list": []
    }
   ]
  },
  {
   "id": "HEALTH",
   "description": "(Santé)",
   "list": [
    {
     "id": "BRAND_4",
     "description": "(Marque)",
     "list": []
    },
    {
     "id": "RETAILER_4",
     "description": "(Distributeur)",
     "list": []
    },
    {
     "id": "CHILD_CARE",
     "description": "(Enfants)",
     "list": []
    },
    {
     "id": "VITAMINS",
     "description": "(Vitamines)",
     "list": []
    },
    {
     "id": "MEDICAL_SUPPLIES",
     "description": "(accessoires médicaux, cuillers, sprays, etc.)",
     "list": []
    },
    {
     "id": "HEALTH_CARE",
     "description": "(Soins)",
     "list": []
    },
    {
     "id": "MEDECINES",
     "description": "(Médicaments)",
     "list": []
    },
    {
     "id": "VISION",
     "description": "(Vue, optique, etc)",
     "list": []
    },
    {
     "id": "SEXUAL_WELLNESS",
     "description": "(Bien être sexuel)",
     "list": []
    },
    {
     "id": "DIETARY_SUPPLEMENTS",
     "description": "(Suppléments alimentaires – vitamines, acides aminés)",
     "list": []
    },
    {
     "id": "BANDAGES",
     "description": "(pansements, bandes velpeau, etc)",
     "list": []
    },
    {
     "id": "HEALTH_BOOKS",
     "description": "(livres Santé)",
     "list": []
    },
    {
     "id": "FIRST_AID",
     "description": "(Premiers Secours)",
     "list": []
    },
    {
     "id": "DIETING",
     "description": "(diètes, régimes)",
     "list": []
    },
    {
     "id": "PRENATAL_CARE",
     "description": "(Soin Prénatal)",
     "list": []
    },
    {
     "id": "ORAL_CARE",
     "description": "(Soins/médicaments par voie orale)",
     "list": []
    }
   ]
  },
  {
   "id": "HOME",
   "description": "&#x1F3E0; (Maison)",
   "list": [
    {
     "id": "BRAND_5",
     "description": "(Marque)",
     "list": []
    },
    {
     "id": "RETAILER_5",
     "description": "(Distributeur)",
     "list": []
    },
    {
     "id": "HOME_AUDIO",
     "description": "(Audio Maison)",
     "list": []
    },
    {
     "id": "DO_IT_YOURSELF_DIY",
     "description": "(Bricolage)",
     "list": []
    },
    {
     "id": "DIY_TOOLS",
     "description": "(Outils bricolage)",
     "list": []
    },
    {
     "id": "STORAGE",
     "description": "(Stockage, remise)",
     "list": []
    },
    {
     "id": "SEASONAL_D_COR",
     "description": "(Décoration saisonnière, Noël ou autres fêtes)",
     "list": []
    },
    {
     "id": "KITCHEN",
     "description": "(Cuisine)",
     "list": []
    },
    {
     "id": "WALL_ART",
     "description": "(Tous ce qui s’accroche aux murs pour décorer)",
     "list": []
    },
    {
     "id": "VACUUMS",
     "description": "(Aspirateurs)",
     "list": []
    },
    {
     "id": "ORGANIZATION",
     "description": "(Rangements)",
     "list": []
    },
    {
     "id": "BEDDING",
     "description": "(Literie)",
     "list": []
    },
    {
     "id": "LIGHTING",
     "description": "(Luminaires, Lumière)",
     "list": []
    },
    {
     "id": "HEATING",
     "description": "(Chauffage)",
     "list": []
    },
    {
     "id": "BATH",
     "description": "(Bain, salles de bains, baignoires, douches, etc)",
     "list": []
    },
    {
     "id": "FURNITURE",
     "description": "&#x1F4BA; (meubles)",
     "list": [
      {
       "id": "CURTAINS",
       "description": "(rideaux)",
       "list": []
      },
      {
       "id": "MIRROR",
       "description": "Miroir",
       "list": []
      },
      {
       "id": "TABLE",
       "description": "",
       "list": []
      },
      {
       "id": "BENCH",
       "description": "(ban)",
       "list": []
      },
      {
       "id": "DRESSER",
       "description": "(buffet, commode)",
       "list": []
      },
      {
       "id": "ARM_CHAIR",
       "description": "(fauteuil)",
       "list": []
      },
      {
       "id": "SHELVES",
       "description": "(étagères)",
       "list": []
      }
     ]
    },
    {
     "id": "CLEANING_SUPPLIES",
     "description": "produits ménage, lessive, serpillères, balais, etc)                    ",
     "list": []
    },
    {
     "id": "DINING",
     "description": "(arts de la table)",
     "list": []
    },
    {
     "id": "COOLING",
     "description": "(Rafraîchisseurs, ventilateurs, Air Conditionné, etc)",
     "list": []
    },
    {
     "id": "CONSTRUCTION",
     "description": "",
     "list": []
    },
    {
     "id": "ELECTRICITY",
     "description": "&#x1F50C; (électricité)",
     "list": [
      {
       "id": "HOUSEHOLD_APPLIANCES",
       "description": "(électroménager)",
       "list": []
      }
     ]
    },
    {
     "id": "FLORRINGS",
     "description": "(sols)",
     "list": []
    },
    {
     "id": "HOME_SERVICES",
     "description": "&#x1F528; (Service Maison)",
     "list": [
      {
       "id": "REPAIRS",
       "description": "(réparations)",
       "list": []
      }
     ]
    },
    {
     "id": "HOME_DECOR",
     "description": "(Décoration maison)",
     "list": []
    }
   ]
  },
  {
   "id": "HOBBIES",
   "description": "",
   "list": [
    {
     "id": "BRAND_6",
     "description": "(Marque)",
     "list": []
    },
    {
     "id": "RETAILER_6",
     "description": "(Distributeur)",
     "list": []
    },
    {
     "id": "ARTS_CRAFTS",
     "description": "(activité artistiques, artisanat)",
     "list": []
    },
    {
     "id": "BEADING",
     "description": "(Broderie)",
     "list": []
    },
    {
     "id": "NEEDLEPOINT",
     "description": "(Tricotage)",
     "list": []
    },
    {
     "id": "JEWELRY_MAKING",
     "description": "",
     "list": []
    },
    {
     "id": "TELESCOPES_FOR_ADULTS",
     "description": "",
     "list": []
    },
    {
     "id": "GARDENING",
     "description": "(jardinage)",
     "list": []
    },
    {
     "id": "STAMPS",
     "description": "(Philatélie)",
     "list": []
    },
    {
     "id": "MUSICAL_INSTRUMENTS",
     "description": "(Instruments musicaux)",
     "list": []
    },
    {
     "id": "MUSIC",
     "description": "(Musique, streaming, CDs, Vyniles, etc)",
     "list": []
    },
    {
     "id": "SEWING",
     "description": "(Couture)",
     "list": []
    },
    {
     "id": "POTTERY",
     "description": "(Poterie)",
     "list": []
    },
    {
     "id": "SPORTING_TRAIN_SETS_",
     "description": "(routines sportives)",
     "list": []
    },
    {
     "id": "VIDEO_GAMES",
     "description": "(Jeux Vidéos)",
     "list": []
    }
   ]
  },
  {
   "id": "PARENTING",
   "description": "",
   "list": [
    {
     "id": "BRAND_7",
     "description": "(Marque)",
     "list": []
    },
    {
     "id": "RETAILER_7",
     "description": "(Distributeur)",
     "list": []
    },
    {
     "id": "TOYS",
     "description": "(Jouets)",
     "list": []
    },
    {
     "id": "BABY_ACCESSORIES",
     "description": "(Accessoires Bébé)",
     "list": []
    },
    {
     "id": "NURSERY",
     "description": "",
     "list": []
    },
    {
     "id": "MATERNITY",
     "description": "(Maternité)",
     "list": []
    },
    {
     "id": "FEEDING",
     "description": "(Nourriture bébés)",
     "list": []
    },
    {
     "id": "CHILD_GIFTS",
     "description": "(Cadeaux enfants)",
     "list": []
    },
    {
     "id": "SAFETY",
     "description": "(Sécurité enfants)",
     "list": []
    },
    {
     "id": "DIAPERS",
     "description": "(Couches)",
     "list": []
    },
    {
     "id": "BABY_CARE",
     "description": "(Soins bébés)",
     "list": []
    },
    {
     "id": "BABY_FOOD",
     "description": "(Alimentation Bébés)",
     "list": []
    },
    {
     "id": "BABY_MONITOR",
     "description": "(Surveillance Bébé)",
     "list": []
    },
    {
     "id": "PREGNANCY_MATERNITY",
     "description": "(Grossesse et Maternité)",
     "list": []
    },
    {
     "id": "STROLLERS",
     "description": "(Prams, Poussettes)",
     "list": []
    }
   ]
  },
  {
   "id": "PETS",
   "description": "(Animaux de compagnie)",
   "list": [
    {
     "id": "BRAND_8",
     "description": "(Marque)",
     "list": []
    },
    {
     "id": "RETAILER_8",
     "description": "(Distributeur)",
     "list": []
    },
    {
     "id": "AQUARIUM",
     "description": "",
     "list": []
    },
    {
     "id": "AMPHIBIANS",
     "description": "",
     "list": []
    },
    {
     "id": "BIRDS",
     "description": "(oiseaux)",
     "list": []
    },
    {
     "id": "DOGS",
     "description": "(chiens)",
     "list": []
    },
    {
     "id": "CATS",
     "description": "(chats)",
     "list": []
    },
    {
     "id": "REPTILES",
     "description": "",
     "list": []
    },
    {
     "id": "SMALL_ANIMALS",
     "description": "(petits animaux)",
     "list": []
    },
    {
     "id": "FISH_1",
     "description": "(poissons)",
     "list": []
    },
    {
     "id": "PET_FOOD",
     "description": "(Alimentation)",
     "list": []
    },
    {
     "id": "PET_SUPPLIES",
     "description": "(Accessoires, brosses, etc)",
     "list": []
    },
    {
     "id": "HORSES",
     "description": "(Chevaux)",
     "list": []
    }
   ]
  },
  {
   "id": "SPORTS",
   "description": "",
   "list": [
    {
     "id": "BRAND_9",
     "description": "(Marque)",
     "list": []
    },
    {
     "id": "RETAILER_9",
     "description": "(Distributeur)",
     "list": []
    },
    {
     "id": "OUDOOR_RECREATION",
     "description": "(Sports à l’extérieur -campagne, randonnée, alpinisme, etc)",
     "list": []
    },
    {
     "id": "SPORTS_1",
     "description": "",
     "list": []
    },
    {
     "id": "FITNESS",
     "description": "",
     "list": []
    },
    {
     "id": "FITNESS_EQUIPMENT",
     "description": "(Appareils Fitness, rameur, cycle intérieur, muscu)",
     "list": []
    },
    {
     "id": "MOUNTAIN_CLIMBING",
     "description": "(Montagne, Alpinisme)",
     "list": []
    },
    {
     "id": "FISHING",
     "description": "(Pêche Sportive)",
     "list": []
    },
    {
     "id": "CAMPING",
     "description": "",
     "list": []
    },
    {
     "id": "BICYCLE",
     "description": "(Vélo)",
     "list": []
    },
    {
     "id": "FOOTBALL",
     "description": "",
     "list": []
    },
    {
     "id": "JOGGING",
     "description": "",
     "list": []
    }
   ]
  },
  {
   "id": "TECHNOLOGY",
   "description": "",
   "list": [
    {
     "id": "BRAND_10",
     "description": "(Marque)",
     "list": []
    },
    {
     "id": "RETAILER_10",
     "description": "(Distributeur)",
     "list": []
    },
    {
     "id": "IT_SOFTWARE",
     "description": "(Logiciels informatique, Programmation, etc…",
     "list": []
    },
    {
     "id": "CELL_PHONES",
     "description": "(Téléphones Mobiles)",
     "list": []
    },
    {
     "id": "HEADPHONES",
     "description": "(écouteurs)",
     "list": []
    },
    {
     "id": "CAMERAS",
     "description": "",
     "list": []
    },
    {
     "id": "SECURITY",
     "description": "",
     "list": []
    },
    {
     "id": "ELECTRONICS",
     "description": "(Composants électroniques)",
     "list": []
    },
    {
     "id": "TELEVISION",
     "description": "",
     "list": []
    },
    {
     "id": "COMPUTERS",
     "description": "(Ordinateurs)",
     "list": []
    },
    {
     "id": "MONITOR",
     "description": "(Moniteurs)",
     "list": []
    },
    {
     "id": "COMPUTER_ACCESSORIES",
     "description": "(Accessoires ordinateurs)",
     "list": []
    },
    {
     "id": "DISK_DRIVES",
     "description": "(Disques Durs)",
     "list": []
    },
    {
     "id": "BATTERIES",
     "description": "",
     "list": []
    },
    {
     "id": "MOBILE_APPLICATIONS",
     "description": "",
     "list": []
    }
   ]
  },
  {
   "id": "TRAVEL",
   "description": "Voyage",
   "list": [
    {
     "id": "BRAND_11",
     "description": "(Marque)",
     "list": []
    },
    {
     "id": "RETAILER_11",
     "description": "(Distributeur)",
     "list": []
    },
    {
     "id": "TRAIN_TICKETS",
     "description": "(Billets de train)",
     "list": []
    },
    {
     "id": "PLANE_TICKETS",
     "description": "(Billets d’avion)",
     "list": []
    },
    {
     "id": "BUS_TICKET",
     "description": "(Ticket de bus ou autocar)",
     "list": []
    },
    {
     "id": "HOLIDAY_HOME_RENTALS",
     "description": "(Locations saisonnières)",
     "list": []
    },
    {
     "id": "ALL_INCLUSIVE_HOLIDAY_RENTALS",
     "description": "(Locations saisonnières tout inclus)",
     "list": []
    },
    {
     "id": "BACKPACKS",
     "description": "(Sacs à dos)",
     "list": []
    },
    {
     "id": "TRAVEL_ACCESSORIES",
     "description": "(Accessoires voyage)",
     "list": []
    },
    {
     "id": "LUGGAGE",
     "description": "(Bagages)",
     "list": []
    },
    {
     "id": "SUITCASE",
     "description": "(Valises)",
     "list": []
    }
   ]
  },
  {
   "id": "NEWS",
   "description": "",
   "list": [
    {
     "id": "BRAND_12",
     "description": "(Marque)",
     "list": []
    },
    {
     "id": "RETAILER_12",
     "description": "(Distributeur)",
     "list": []
    },
    {
     "id": "MAINSTREAM_NEWSPAPERS",
     "description": "(Journaux généralistes)",
     "list": []
    },
    {
     "id": "NEWS_WEBSITES",
     "description": "(sites de news en ligne)",
     "list": []
    },
    {
     "id": "NEWS_BLOGS",
     "description": "(Sites de discussions news)",
     "list": []
    },
    {
     "id": "SPORTS_NEWS",
     "description": "(Nouvelles de sport)",
     "list": []
    },
    {
     "id": "FASHION_NEWS",
     "description": "(Nouvelles de mode)",
     "list": []
    },
    {
     "id": "WOMEN_NEWS",
     "description": "(Magazines Femme)",
     "list": []
    },
    {
     "id": "MEN_MAGAZINES",
     "description": "(Magazines Homme)",
     "list": []
    },
    {
     "id": "LGBT_MAGAZINES",
     "description": "(Magazines LGBT)",
     "list": []
    },
    {
     "id": "DIY_NEWS",
     "description": "(Nouvelles Bricolage)",
     "list": []
    },
    {
     "id": "FOOD_NEWS",
     "description": "(Nouvelles Alimentation)",
     "list": []
    },
    {
     "id": "SPORTS_BLOGS",
     "description": "(blogs sports)",
     "list": []
    },
    {
     "id": "POLITICS",
     "description": "",
     "list": [
      {
       "id": "BLOGS",
       "description": "",
       "list": []
      },
      {
       "id": "WEBSITES",
       "description": "",
       "list": []
      }
     ]
    }
   ]
  },
  {
   "id": "CUSTOMER_SERVICE",
   "description": "",
   "list": [
    {
     "id": "BRAND_13",
     "description": "(Marque)",
     "list": []
    },
    {
     "id": "RETAILER_13",
     "description": "(Distributeur)",
     "list": []
    },
    {
     "id": "EMAILS",
     "description": "",
     "list": []
    },
    {
     "id": "ORDERS",
     "description": "(Commandes)",
     "list": []
    },
    {
     "id": "COMMENTS",
     "description": "(Commentaires)",
     "list": []
    },
    {
     "id": "CONTACT_ADDRESS_OR_TELEPHONE",
     "description": "",
     "list": []
    },
    {
     "id": "QUESTIONS",
     "description": "",
     "list": []
    },
    {
     "id": "NEWSLETTERS",
     "description": "",
     "list": []
    },
    {
     "id": "TIME_SHEDULE",
     "description": "horaires",
     "list": []
    }
   ]
  },
  {
   "id": "PAYMENTS_AND_INSURANCES",
   "description": "(Paiements et Assurances)",
   "list": [
    {
     "id": "BRAND_14",
     "description": "(Marque)",
     "list": []
    },
    {
     "id": "RETAILER_14",
     "description": "(Distributeur)",
     "list": []
    },
    {
     "id": "PAYMENT_SYSTEMS",
     "description": "(Systèmes de paiement)",
     "list": []
    },
    {
     "id": "TERMS_AND_CONDITIONS",
     "description": "(Conditions Générale de Vente)",
     "list": []
    }
   ]
  },
  {
   "id": "DELIVERIES",
   "description": "(Livraisons)",
   "list": [
    {
     "id": "BRAND_15",
     "description": "(Marque)",
     "list": []
    },
    {
     "id": "RETAILER_15",
     "description": "(Distributeur)",
     "list": []
    },
    {
     "id": "CARRIER",
     "description": "(Transporteur)",
     "list": []
    },
    {
     "id": "COMPLAINTS",
     "description": "(Réclamations)",
     "list": []
    },
    {
     "id": "TIME_SCHEDULE",
     "description": "(horaire)",
     "list": []
    }
   ]
  },
  {
   "id": "TIME_OUT",
   "description": " (sorties)",
   "list": [
    {
     "id": "THEATER",
     "description": "",
     "list": [
      {
       "id": "TICKETS",
       "description": "",
       "list": []
      }
     ]
    },
    {
     "id": "CINEMA",
     "description": "",
     "list": [
      {
       "id": "TICKECTS",
       "description": "",
       "list": []
      }
     ]
    },
    {
     "id": "MUSEUMS",
     "description": "",
     "list": [
      {
       "id": "TICKETS_1",
       "description": "",
       "list": []
      }
     ]
    },
    {
     "id": "RESTAURANTS",
     "description": "",
     "list": []
    },
    {
     "id": "OPERA",
     "description": "",
     "list": [
      {
       "id": "TICKETS_2",
       "description": "",
       "list": []
      }
     ]
    },
    {
     "id": "BALLET",
     "description": "",
     "list": [
      {
       "id": "TICKETS_3",
       "description": "",
       "list": []
      }
     ]
    },
    {
     "id": "CONCERTS",
     "description": "",
     "list": []
    },
    {
     "id": "CLUBBING",
     "description": "",
     "list": [
      {
       "id": "TICKETS_4",
       "description": "",
       "list": []
      }
     ]
    },
    {
     "id": "CABARET",
     "description": "",
     "list": [
      {
       "id": "TICKETS_5",
       "description": "",
       "list": []
      }
     ]
    },
    {
     "id": "CONFERENCES",
     "description": "",
     "list": [
      {
       "id": "TICKETS_6",
       "description": "",
       "list": []
      }
     ]
    },
    {
     "id": "BARS",
     "description": "",
     "list": [
      {
       "id": "BEERS",
       "description": "",
       "list": []
      },
      {
       "id": "WINE_BARS",
       "description": "",
       "list": []
      },
      {
       "id": "BRASSERIES",
       "description": "",
       "list": []
      }
     ]
    }
   ]
  },
  {
   "id": "BOOKS",
   "description": "(livres)",
   "list": [
    {
     "id": "B_ARCHITECTURE",
     "description": "livres architecture",
     "list": []
    },
    {
     "id": "B_ARTS",
     "description": "livres arts",
     "list": []
    },
    {
     "id": "B_CINEMA",
     "description": "livres cinéma",
     "list": []
    },
    {
     "id": "B_COOKING",
     "description": "livres cuisine",
     "list": []
    },
    {
     "id": "B_DIY",
     "description": "",
     "list": []
    },
    {
     "id": "B_ENGINEERING",
     "description": "",
     "list": []
    },
    {
     "id": "B_GARDENING",
     "description": "",
     "list": []
    },
    {
     "id": "B_GEOGRAPHY",
     "description": "",
     "list": []
    },
    {
     "id": "B_HISTORY",
     "description": "",
     "list": []
    },
    {
     "id": "B_HISTORY_OF_ART",
     "description": "",
     "list": []
    },
    {
     "id": "B_NOVELS",
     "description": "romans",
     "list": []
    },
    {
     "id": "B_PETS",
     "description": "",
     "list": []
    },
    {
     "id": "B_PHILOSOPHY",
     "description": "",
     "list": []
    },
    {
     "id": "B_SOFTWARE_DEVELOPMENT",
     "description": "",
     "list": []
    },
    {
     "id": "B_SPORTS",
     "description": "",
     "list": []
    },
    {
     "id": "B_TRAVEL",
     "description": "",
     "list": []
    }
   ]
  }
 ]
}
`
/*}}}*/
);

})();
/*{{{
:e TAX/javascript/taxo_json.js
:grep -wl taxo_json
:1,-s/"code":/"id":/
:1,-s/"children":/"list":/
}}}*/
/*{{{
    manifest.json

    javascript/taxo_background.js
    javascript/taxo_content.js

    javascript/taxo_json.js
    javascript/taxonomy_json.js

    javascript/taxo_tools.js

}}}*/
/* BY LEVEL SAMPLE {{{
:%g/^           "list"/--t$
:%g/^         "list"/--t$
:%g/^       "list"/--t$
:%g/^     "list"/--t$
:%g/^   "list"/--t$
:%g/^ "list"/--t$
           "id": "RING_MEN",
         "id": "BATHING_SUIT_MEN",
       "id": "BATHING_SUIT",
     "id": "BRAND",
   "id": "OTHER",
 "id": "ALL",
}}}*/
