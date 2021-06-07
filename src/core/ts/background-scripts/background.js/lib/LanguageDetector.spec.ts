/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import { assert } from "chai";
import * as detectorModule from "./LanguageDetector";
import {
  DetectedLanguageResults,
  DetectLanguageParams,
} from "./LanguageDetector";
const { LanguageDetector } = detectorModule;

/* eslint-disable mocha/no-setup-in-describe */
describe("LanguageDetector", function() {
  function check_result(result, expected: DetectedLanguageResults) {
    console.debug({ result, expected });

    assert.equal(result.language, expected.language, "Expected language code");

    // Round percentage up to the nearest 5%, since most strings are
    // detected at slightly less than 100%, and we don't want to
    // encode each exact value.
    const apprPercent = percent => {
      return Math.ceil(percent / 20) * 20;
    };

    assert.equal(
      result.languages.length,
      expected.languages.length,
      "Expected amount of language results",
    );
    assert.equal(result.confident, expected.confident, "Expected confidence");

    expected.languages.forEach((language, index) => {
      assert.equal(
        result.languages[index].languageCode,
        language.languageCode,
        "Expected language code",
      );
      assert.equal(
        apprPercent(result.languages[index].percent),
        apprPercent(language.percent),
        "Expected language percent",
      );
    });
  }

  it("Test DOM samples", async function() {
    for (const item of kTestPairs) {
      const text = item[0];
      const expected = item[1];
      const result = await LanguageDetector.detectLanguage(text);
      check_result(result, expected);
    }
  });

  /* eslint-disable mozilla/no-arbitrary-setTimeout */
  /*
  // Test that the worker is flushed shortly after processing a large
  // string.
  add_task(async function test_worker_flush() {
    let test_string = kTeststr_fr_en_Latn;
    let test_item = kTestPairs.find(item => item[2] == test_string);

    // Set shorter timeouts and lower string lengths to make things easier
    // on the test infrastructure.
    detectorModule.LARGE_STRING = test_string.length - 1;
    detectorModule.IDLE_TIMEOUT = 1000;

    assert.equal(
      detectorModule.workerManager._idleTimeout,
      null,
      "Should have no idle timeout to start with"
    );

    let result = await LanguageDetector.detectLanguage(test_string);

    // Make sure the results are still correct.
    check_result(result, test_item[0], test_item[3]);

    // We should have an idle timeout after processing the string.
    assert(
      detectorModule.workerManager._idleTimeout != null,
      "Should have an idle timeout"
    );
    assert(
      detectorModule.workerManager._worker != null,
      "Should have a worker instance"
    );
    assert(
      detectorModule.workerManager._workerReadyPromise != null,
      "Should have a worker promise"
    );

    // Wait for the idle timeout to elapse.
    await new Promise(resolve =>
      setTimeout(resolve, detectorModule.IDLE_TIMEOUT)
    );

    assert.equal(
      detectorModule.workerManager._idleTimeout,
      null,
      "Should have no idle timeout after it has elapsed"
    );
    assert.equal(
      detectorModule.workerManager._worker,
      null,
      "Should have no worker instance after idle timeout"
    );
    assert.equal(
      detectorModule.workerManager._workerReadyPromise,
      null,
      "Should have no worker promise after idle timeout"
    );

    // We should still be able to use the language detector after its
    // worker has been flushed.
    result = await LanguageDetector.detectLanguage(test_string);

    // Make sure the results are still correct.
    check_result(result, test_item[0], test_item[3]);
  });

   */

  const kTeststr_mozilla_org_es =
    "Menú\n\n    \n      Descargar Firefox\n    \n  \n\n      Aviso de privacidad de Firefox\n    \nConsigue una Firefox Account\nNavegadores Firefox\nCerrar el menú Navegadores Firefox\nFirefox para escritorio\nObtén el navegador respaldado por una organización sin ánimo de lucro para Windows, Mac o Linux.\nFirefox para Android\nObtén el navegador móvil personalizable para teléfonos inteligentes Android.\nFirefox para iOS\nObtén el navegador móvil para tu iPhone o iPad.\nPromesa de privacidad\nDescubre cómo Firefox trata tus datos con respeto.\nBlog de Firefox\nLee acerca de las nuevas características de Firefox y maneras de mantenerte seguro en línea.\nNotas de la versión\nObtén los detalles de las últimas actualizaciones de Firefox.\nVer todos los Navegadores Firefox\nProductos\nCerrar el menú de productos\nFirefox Monitor\nComprueba si tu correo electrónico apareció en la filtración de datos de una empresa.\nFacebook Container\nAyuda a evitar que Facebook recopile tus datos fuera de su sitio.\nPocket\nGuarda y descubre las mejores historias de toda la web.\nMozilla VPN\nObtén protección más allá de tu navegador, en todos tus dispositivos.\nPromesa del producto\nDescubre cómo cada producto de Firefox protege y respeta tus datos.\nFirefox Relay\nRegístrate para tener nuevas cuentas sin revelar tu correo electrónico.\nFirefox Private Network (beta)\nProtege la conexión de tu navegador a Internet.\nVer todos los productos\nQuiénes somos\nCerrar menú Quiénes somos\nManifiesto de Mozilla\nConoce más acerca de los valores y principios que guían nuestra misión.\nMozilla Foundation\nConoce a la organización sin ánimo de lucro detrás de Firefox que lucha por una web mejor.\nInvolúcrate\nÚnete a la lucha por un internet saludable.\nLiderazgo\nConoce al equipo que está construyendo tecnología para un internet mejor.\nEmpleos\nTrabaja para una organización motivada por la misión de hacer productos que priorizan a las personas.\nBlog de Mozilla\nConoce más sobre Mozilla y los problemas que nos importan.\nMás acerca de Mozilla\nInnovación\nCerrar menú Innovación\nMozilla Hubs\nReúnete en este espacio social interactivo, en línea, multidimensional.\nFirefox Developer Edition\nObtén el navegador Firefox creado solo para desarrolladores.\nMDN Web Docs\nRevisa la página principal de los recursos para el desarrollador web.\nFirefox Reality\nExplora la web con el navegador Firefox para la realidad virtual.\nCommon Voice\nDona tu voz para que el futuro de la web pueda escuchar a todos.\nWebAssembly\nConoce más sobre el nuevo lenguaje de bajo nivel, parecido a ensamblador.\nMás innovación de Mozilla\nAbierto a nuevas ideas\n\n    \n      Descargar Firefox\n    \n  \n\n      Aviso de privacidad de Firefox\n    \nExplora Firefox\nLalo Luevano –\nRestaurador, fan de Firefox\nHacemos Internet más seguro, saludable y rápido para siempre.\nMozilla es la organización sin ánimo de lucro responsable de Firefox, el navegador alternativo original. Creamos productos y políticas para mantener Internet al servicio de las personas, no del beneficio.\nNuestro impacto\nCuando usas Firefox, ayudas a Mozilla a luchar contra la desinformación en Internet, enseñar habilidades digitales y hacer más humana la sección de comentarios. Mira lo que ayuda a crear un Internet más saludable.\nMozilla Information Trust Initiative\nEmpoderando a las mujeres en línea\nThe Coral Project\nLee nuestro informe sobre la salud de Internet\nNuestras innovaciones\n\n            Al usar la Web como plataforma, construimos tecnologías abiertas e innovadoras que permiten a los desarrolladores liberarse de los ecosistemas corporativos cerrados, con el fin de crear una Web más segura y rápida para todos nosotros.\n          \nCommon Voice\nPlataforma de realidad virtual\nServo\nRust\nExtensiones\n\n            Personaliza Firefox con tus extras favoritos como gestores de contraseñas, bloqueadores de anuncios y mucho más.\n          \nEmpleos\n\n            Infórmate de las ventajas de trabajar en Mozilla y echa un vistazo a las vacantes que hay en todo el mundo.\n          \n¿Necesitas ayuda?\n\n            Obtén respuestas de nuestro equipo de ayuda a todas tus preguntas sobre Firefox y todos los productos Mozilla.\n          \nRecibe noticias de Firefox\n\n      \n        Tu dirección de correo electrónico\n      \n      \nAfganistán\nAkrotiri\nAlbania\nAlemania\nAndorra\nAngola\nAnguilla\nAntigua y Barbuda\nAntártida\nArabia Saudí\nArgelia\nArgentina\nArmenia\nArrecife Kingman\nAruba\nAtolón Johnston\nAtolón Palmira\nAustralia\nAustria\nAzerbayán\nBahrain\nBangladesh\nBarbados\nBassas da India\nBelarús\nBelice\nBenin\nBermuda\nBhutan\nBolivia\nBonaire, San Eustaquio y Saba\nBosnia-Herzegovina\nBotswana\nBrasil\nBrunei\nBulgaria\nBurkina Faso\nBurma\nBurundi\nBélgica\nCabo Verde\nCamboya\nCamerún\nCanadá\nChad\nChile\nChina\nChipre\nCisjordania\nCiudad del Vaticano\nColombia\nComoros\nCongo (Brazzaville)\nCongo (Kinshasa)\nCorea del Norte\nCorea del Sur\\\u0020\nCosta Ivory\nCosta Rica\nCroacia\nCuba\nCurazao\nDhekelia\nDiego García\nDinamarca\nDjibouti\nDominica\nEcuador\nEgipto\nEl Salvador\nEmiratos Árabes Unidos\nEritrea\nEslovaquia\nEslovenia\nEspaña\nEstados Federados de la Micronesia\nEstados Unidos\nEstonia\nEtiopía\nFiji\nFilipinas\nFinlandia\nFrancia\nFranja de Gaza\nGabón\nGambia\nGeorgia\nGeorgia del Sur y las Islas Sandwich del Sur\nGhana\nGibraltar\nGranada\nGrecia\nGroenlandia\nGuadalupe\nGuam\nGuatemala\nGuayana Francesa\nGuernsey\nGuinea\nGuinea Ecuatorial\nGuinea-Bissau\nGuyana\nHaiti\nHolanda (Países Bajos)\nHonduras\nHong Kong\nHungría\nIndia\nIndonesia\nIraq\nIrlanda\nIrán\nIsla Baker\nIsla Bouvet\nIsla Clipperton\nIsla Europa\nIsla Howland\nIsla Jarvis\nIsla Juan de Nova\nIsla Norfolk\nIsla Tromelin\nIsla Wake\nIsla de Man\nIsla de Navaza\nIsla de Navidad\nIslandia\nIslas Ashmore y Cartier\nIslas Caimán\nIslas Cocos (Keeling)\nIslas Cook\nIslas Faroe\nIslas Glorioso\nIslas Heard e Islas McDonald\nIslas Malvinas (Falkland)\nIslas Marianas del Norte\nIslas Marshall\nIslas Midway\nIslas Paracelso\nIslas Pitcairn\nIslas Salomón\nIslas Spratly\nIslas Turcas y Caicos\nIslas Vírgenes Británicas\nIslas Vírgenes U.S.\nIslas del Mar del Coral\nIsrael\nItalia\nJamaica\nJan Mayen\nJapón\nJersey\nJordania\nKazajstán\nKenia\nKiribati\nKosovo\nKuwait\nKyrgyzstan\nLaos\nLas Bahamas\nLesotho\nLetonia\nLiberia\nLibia\nLiechtenstein\nLituania\nLuxemburgo\nLíbano\nMacao\nMacedonia\nMadagascar\nMalasia\nMalawi\nMaldivas\nMali\nMalta\nMarruecos\nMartinica\nMauricio\nMauritania\nMayotte\nMoldavia\nMongolia\nMontenegro\nMontserrat\nMozambique\nMéxico\nMónaco\nNamibia\nNauru\nNepal\nNicaragua\nNigeria\nNiue\nNoruega\nNueva Caledonia\nNueva Zelanda\nNíger\nOmán\nPakistán\nPalau\nPanamá\nPapúa Nueva Guinea\nParaguay\nPerú\nPolinesia Francesa\nPolonia\nPortugal\nPuerto Rico\nQatar\nReino Unido\nRepública Centroafricana\nRepública Checa\nRepública Dominicana\nReunión\nRuanda\nRumanía\nRusia\nSaint Kitts y Nevis\nSamoa\nSamoa americana\nSan Bartolomé\nSan Marino\nSan Martín\nSan Pedro y Miquelón\nSan Tome y Príncipe\nSan Vicente y las Granadinas\nSanta Elena, Ascensión y Tristán de Acuña\nSanta Lucía\nSenegal\nSerbia\nSeychelles\nSierra Leona\nSingapur\nSint Maarten\nSiria\nSomalia\nSri Lanka\nSudáfrica\nSudán\nSudán del Sur\nSuecia\nSuiza\nSuriname\nSvalbard\nSwazilandia\nSáhara Occidental\nTailandia\nTaiwán\nTanzania\nTayikistán\nTerritorio británico en el Océano Índico\nTerritorios franceses del sur y tierras antárticas\nTimor Oriental\nTogo\nTokelau\nTonga\nTrinidad y Tobago\nTurkmenistán\nTurquía\nTuvalu\nTúnez\nUcrania\nUganda\nUruguay\nUzbekistán\nVanuatu\nVenezuela\nVietnám\nWallis y Futuna\nYemen\nZambia\nZimbabwe\nIdiomas disponibles\nDeutsch\nEnglish\nFrançais\nFormato\n\n               HTML\n            \n\n               Texto\n            \n\n             Me parece bien que Mozilla gestione mi información según se indica en esta declaración de privacidad\n          \nesta declaración de privacidad\n\n          \n            Suscríbete ya\n          \n        \n\n              \n              \n                Solo te enviaremos información relacionada con Firefox.\n              \n            \n¡Gracias!\nSi anteriormente no has confirmado una suscripción a algún boletín de Mozilla, tendrás que hacerlo ahora. Revisa tu bandeja de entrada o tu filtro de correo no deseado y comprueba que te ha llegado un correo nuestro.\n\n            Empresa\n          \nManifiesto de Mozilla\nÁrea de prensa\nBlog corporativo\nEmpleos\nContacto\nDonar\n\n            Recursos\n          \nCentro de privacidad\nComparación de navegadores\nEstándares de la marca\n\n            Ayuda\n          \nSoporte de producto\nAbre un bug\n\n            Desarrolladores\n          \nDeveloper Edition\nBeta\nBeta para Android\nNightly\nNightly para Android\nEnterprise\nHerramientas\nSeguir a @Mozilla\nTwitter (@mozilla)\n (@mozilla)\nInstagram (@mozilla)\n (@mozilla)\nSeguir a @Firefox\nTwitter (@firefox)\n (@firefox)\nInstagram (@firefox)\n (@firefox)\nYouTube (@firefoxchannel)\n (@firefoxchannel)\nIdioma\nIdioma\naragonés\nعربي\nAsturianu\nAzərbaycanca\nБеларуская\nБългарски\nবাংলা\nBosanski\nCatalà\nMaya Kaqchikel\nČeština\nCymraeg\nDansk\nDeutsch\nDolnoserbšćina\nΕλληνικά\nEnglish (Canadian)\nEnglish (British)\nEnglish\nEsperanto\nEspañol (de Argentina)\nEspañol (de Chile)\nEspañol (de España)\nEspañol (de México)\nEesti keel\nEuskara\nفارسی\nsuomi\nFrançais\nFrysk\nGalego\nAvañe'ẽ\nગુજરાતી (ભારત)\nहिन्दी (भारत)\nHrvatski\nHornjoserbsce\nmagyar\nՀայերեն\nInterlingua\nBahasa Indonesia\nItaliano\n日本語\nქართული\nTaqbaylit\n한국어\nLigure\nLietuvių\nമലയാളം\nमराठी\nMelayu\nမြန်မာဘာသာ\nNorsk bokmål\nNederlands\nNorsk nynorsk\nਪੰਜਾਬੀ (ਭਾਰਤ)\nPolski\nPortuguês (do Brasil)\nPortuguês (Europeu)\nrumantsch\nRomână\nРусский\nslovenčina\nSlovenščina\nShqip\nСрпски\nSvenska\nதமிழ்\nไทย\nTürkçe\nTriqui\nУкраїнська\nاُردو\nTiếng Việt\n中文 (简体)\n正體中文 (繁體)\nIr\nMozilla\nPolítica de privacidad del sitio web\nCookies\nLegal\nPautas para la participación en la comunidad\n\n          \n          \n          Visita la empresa matriz sin ánimo de lucro de la Mozilla Corporation, la Mozilla Foundation.\n          Algunos contenidos están protegidos por los derechos de autor ©2019–2021 de determinados colaboradores en mozilla.org. El resto de contenidos está disponible bajo una licencia Creative Commons.\n        \nMozilla Corporation\nMozilla Foundation\nCreative Commons";
  const kTeststr_mozilla_org_es_wo_lang_menu_options =
    "Menú\n\n    \n      Descargar Firefox\n    \n  \n\n      Aviso de privacidad de Firefox\n    \nConsigue una Firefox Account\nNavegadores Firefox\nCerrar el menú Navegadores Firefox\nFirefox para escritorio\nObtén el navegador respaldado por una organización sin ánimo de lucro para Windows, Mac o Linux.\nFirefox para Android\nObtén el navegador móvil personalizable para teléfonos inteligentes Android.\nFirefox para iOS\nObtén el navegador móvil para tu iPhone o iPad.\nPromesa de privacidad\nDescubre cómo Firefox trata tus datos con respeto.\nBlog de Firefox\nLee acerca de las nuevas características de Firefox y maneras de mantenerte seguro en línea.\nNotas de la versión\nObtén los detalles de las últimas actualizaciones de Firefox.\nVer todos los Navegadores Firefox\nProductos\nCerrar el menú de productos\nFirefox Monitor\nComprueba si tu correo electrónico apareció en la filtración de datos de una empresa.\nFacebook Container\nAyuda a evitar que Facebook recopile tus datos fuera de su sitio.\nPocket\nGuarda y descubre las mejores historias de toda la web.\nMozilla VPN\nObtén protección más allá de tu navegador, en todos tus dispositivos.\nPromesa del producto\nDescubre cómo cada producto de Firefox protege y respeta tus datos.\nFirefox Relay\nRegístrate para tener nuevas cuentas sin revelar tu correo electrónico.\nFirefox Private Network (beta)\nProtege la conexión de tu navegador a Internet.\nVer todos los productos\nQuiénes somos\nCerrar menú Quiénes somos\nManifiesto de Mozilla\nConoce más acerca de los valores y principios que guían nuestra misión.\nMozilla Foundation\nConoce a la organización sin ánimo de lucro detrás de Firefox que lucha por una web mejor.\nInvolúcrate\nÚnete a la lucha por un internet saludable.\nLiderazgo\nConoce al equipo que está construyendo tecnología para un internet mejor.\nEmpleos\nTrabaja para una organización motivada por la misión de hacer productos que priorizan a las personas.\nBlog de Mozilla\nConoce más sobre Mozilla y los problemas que nos importan.\nMás acerca de Mozilla\nInnovación\nCerrar menú Innovación\nMozilla Hubs\nReúnete en este espacio social interactivo, en línea, multidimensional.\nFirefox Developer Edition\nObtén el navegador Firefox creado solo para desarrolladores.\nMDN Web Docs\nRevisa la página principal de los recursos para el desarrollador web.\nFirefox Reality\nExplora la web con el navegador Firefox para la realidad virtual.\nCommon Voice\nDona tu voz para que el futuro de la web pueda escuchar a todos.\nWebAssembly\nConoce más sobre el nuevo lenguaje de bajo nivel, parecido a ensamblador.\nMás innovación de Mozilla\nAbierto a nuevas ideas\n\n    \n      Descargar Firefox\n    \n  \n\n      Aviso de privacidad de Firefox\n    \nExplora Firefox\nLalo Luevano –\nRestaurador, fan de Firefox\nHacemos Internet más seguro, saludable y rápido para siempre.\nMozilla es la organización sin ánimo de lucro responsable de Firefox, el navegador alternativo original. Creamos productos y políticas para mantener Internet al servicio de las personas, no del beneficio.\nNuestro impacto\nCuando usas Firefox, ayudas a Mozilla a luchar contra la desinformación en Internet, enseñar habilidades digitales y hacer más humana la sección de comentarios. Mira lo que ayuda a crear un Internet más saludable.\nMozilla Information Trust Initiative\nEmpoderando a las mujeres en línea\nThe Coral Project\nLee nuestro informe sobre la salud de Internet\nNuestras innovaciones\n\n            Al usar la Web como plataforma, construimos tecnologías abiertas e innovadoras que permiten a los desarrolladores liberarse de los ecosistemas corporativos cerrados, con el fin de crear una Web más segura y rápida para todos nosotros.\n          \nCommon Voice\nPlataforma de realidad virtual\nServo\nRust\nExtensiones\n\n            Personaliza Firefox con tus extras favoritos como gestores de contraseñas, bloqueadores de anuncios y mucho más.\n          \nEmpleos\n\n            Infórmate de las ventajas de trabajar en Mozilla y echa un vistazo a las vacantes que hay en todo el mundo.\n          \n¿Necesitas ayuda?\n\n            Obtén respuestas de nuestro equipo de ayuda a todas tus preguntas sobre Firefox y todos los productos Mozilla.\n          \nRecibe noticias de Firefox\n\n      \n        Tu dirección de correo electrónico\n      \n      \nAfganistán\nAkrotiri\nAlbania\nAlemania\nAndorra\nAngola\nAnguilla\nAntigua y Barbuda\nAntártida\nArabia Saudí\nArgelia\nArgentina\nArmenia\nArrecife Kingman\nAruba\nAtolón Johnston\nAtolón Palmira\nAustralia\nAustria\nAzerbayán\nBahrain\nBangladesh\nBarbados\nBassas da India\nBelarús\nBelice\nBenin\nBermuda\nBhutan\nBolivia\nBonaire, San Eustaquio y Saba\nBosnia-Herzegovina\nBotswana\nBrasil\nBrunei\nBulgaria\nBurkina Faso\nBurma\nBurundi\nBélgica\nCabo Verde\nCamboya\nCamerún\nCanadá\nChad\nChile\nChina\nChipre\nCisjordania\nCiudad del Vaticano\nColombia\nComoros\nCongo (Brazzaville)\nCongo (Kinshasa)\nCorea del Norte\nCorea del Sur\\\u0020\nCosta Ivory\nCosta Rica\nCroacia\nCuba\nCurazao\nDhekelia\nDiego García\nDinamarca\nDjibouti\nDominica\nEcuador\nEgipto\nEl Salvador\nEmiratos Árabes Unidos\nEritrea\nEslovaquia\nEslovenia\nEspaña\nEstados Federados de la Micronesia\nEstados Unidos\nEstonia\nEtiopía\nFiji\nFilipinas\nFinlandia\nFrancia\nFranja de Gaza\nGabón\nGambia\nGeorgia\nGeorgia del Sur y las Islas Sandwich del Sur\nGhana\nGibraltar\nGranada\nGrecia\nGroenlandia\nGuadalupe\nGuam\nGuatemala\nGuayana Francesa\nGuernsey\nGuinea\nGuinea Ecuatorial\nGuinea-Bissau\nGuyana\nHaiti\nHolanda (Países Bajos)\nHonduras\nHong Kong\nHungría\nIndia\nIndonesia\nIraq\nIrlanda\nIrán\nIsla Baker\nIsla Bouvet\nIsla Clipperton\nIsla Europa\nIsla Howland\nIsla Jarvis\nIsla Juan de Nova\nIsla Norfolk\nIsla Tromelin\nIsla Wake\nIsla de Man\nIsla de Navaza\nIsla de Navidad\nIslandia\nIslas Ashmore y Cartier\nIslas Caimán\nIslas Cocos (Keeling)\nIslas Cook\nIslas Faroe\nIslas Glorioso\nIslas Heard e Islas McDonald\nIslas Malvinas (Falkland)\nIslas Marianas del Norte\nIslas Marshall\nIslas Midway\nIslas Paracelso\nIslas Pitcairn\nIslas Salomón\nIslas Spratly\nIslas Turcas y Caicos\nIslas Vírgenes Británicas\nIslas Vírgenes U.S.\nIslas del Mar del Coral\nIsrael\nItalia\nJamaica\nJan Mayen\nJapón\nJersey\nJordania\nKazajstán\nKenia\nKiribati\nKosovo\nKuwait\nKyrgyzstan\nLaos\nLas Bahamas\nLesotho\nLetonia\nLiberia\nLibia\nLiechtenstein\nLituania\nLuxemburgo\nLíbano\nMacao\nMacedonia\nMadagascar\nMalasia\nMalawi\nMaldivas\nMali\nMalta\nMarruecos\nMartinica\nMauricio\nMauritania\nMayotte\nMoldavia\nMongolia\nMontenegro\nMontserrat\nMozambique\nMéxico\nMónaco\nNamibia\nNauru\nNepal\nNicaragua\nNigeria\nNiue\nNoruega\nNueva Caledonia\nNueva Zelanda\nNíger\nOmán\nPakistán\nPalau\nPanamá\nPapúa Nueva Guinea\nParaguay\nPerú\nPolinesia Francesa\nPolonia\nPortugal\nPuerto Rico\nQatar\nReino Unido\nRepública Centroafricana\nRepública Checa\nRepública Dominicana\nReunión\nRuanda\nRumanía\nRusia\nSaint Kitts y Nevis\nSamoa\nSamoa americana\nSan Bartolomé\nSan Marino\nSan Martín\nSan Pedro y Miquelón\nSan Tome y Príncipe\nSan Vicente y las Granadinas\nSanta Elena, Ascensión y Tristán de Acuña\nSanta Lucía\nSenegal\nSerbia\nSeychelles\nSierra Leona\nSingapur\nSint Maarten\nSiria\nSomalia\nSri Lanka\nSudáfrica\nSudán\nSudán del Sur\nSuecia\nSuiza\nSuriname\nSvalbard\nSwazilandia\nSáhara Occidental\nTailandia\nTaiwán\nTanzania\nTayikistán\nTerritorio británico en el Océano Índico\nTerritorios franceses del sur y tierras antárticas\nTimor Oriental\nTogo\nTokelau\nTonga\nTrinidad y Tobago\nTurkmenistán\nTurquía\nTuvalu\nTúnez\nUcrania\nUganda\nUruguay\nUzbekistán\nVanuatu\nVenezuela\nVietnám\nWallis y Futuna\nYemen\nZambia\nZimbabwe\nIdiomas disponibles\nDeutsch\nEnglish\nFrançais\nFormato\n\n               HTML\n            \n\n               Texto\n            \n\n             Me parece bien que Mozilla gestione mi información según se indica en esta declaración de privacidad\n          \nesta declaración de privacidad\n\n          \n            Suscríbete ya\n          \n        \n\n              \n              \n                Solo te enviaremos información relacionada con Firefox.\n              \n            \n¡Gracias!\nSi anteriormente no has confirmado una suscripción a algún boletín de Mozilla, tendrás que hacerlo ahora. Revisa tu bandeja de entrada o tu filtro de correo no deseado y comprueba que te ha llegado un correo nuestro.\n\n            Empresa\n          \nManifiesto de Mozilla\nÁrea de prensa\nBlog corporativo\nEmpleos\nContacto\nDonar\n\n            Recursos\n          \nCentro de privacidad\nComparación de navegadores\nEstándares de la marca\n\n            Ayuda\n          \nSoporte de producto\nAbre un bug\n\n            Desarrolladores\n          \nDeveloper Edition\nBeta\nBeta para Android\nNightly\nNightly para Android\nEnterprise\nHerramientas\nSeguir a @Mozilla\nTwitter (@mozilla)\n (@mozilla)\nInstagram (@mozilla)\n (@mozilla)\nSeguir a @Firefox\nTwitter (@firefox)\n (@firefox)\nInstagram (@firefox)\n (@firefox)\nYouTube (@firefoxchannel)\n (@firefoxchannel)\nIdioma\nIdioma\nIr\nMozilla\nPolítica de privacidad del sitio web\nCookies\nLegal\nPautas para la participación en la comunidad\n\n          \n          \n          Visita la empresa matriz sin ánimo de lucro de la Mozilla Corporation, la Mozilla Foundation.\n          Algunos contenidos están protegidos por los derechos de autor ©2019–2021 de determinados colaboradores en mozilla.org. El resto de contenidos está disponible bajo una licencia Creative Commons.\n        \nMozilla Corporation\nMozilla Foundation\nCreative Commons";

  const kTestPairs: [
    string | DetectLanguageParams,
    DetectedLanguageResults,
  ][] = [
    [
      kTeststr_mozilla_org_es,
      {
        language: "es",
        confident: false,
        languages: [
          { languageCode: "es", percent: 76 },
          { languageCode: "hi", percent: 1 },
          { languageCode: "no", percent: 0 },
        ],
      },
    ],
    [
      kTeststr_mozilla_org_es_wo_lang_menu_options,
      {
        language: "es",
        confident: true,
        languages: [{ languageCode: "es", percent: 87 }],
      },
    ],
  ];
});
