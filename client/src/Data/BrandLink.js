const brandLinks = {
    HP: 'https://support.hp.com/in-en/checkwarranty',
    Samsung: 'https://www.samsung.com/in/support/warranty/',
    Sony: 'https://www.sony.co.in/electronics/support/articles/00244607',
    Dell: 'https://www.dell.com/support/home/en-in?app=warranty',
    Asus: 'https://www.asus.com/support/warranty-status-inquiry/',
    Lenovo: 'https://pcsupport.lenovo.com/in/en/warrantylookup',
    LG: 'https://lg-dfs-warranty.com/warranty-lookup',
    Realme: 'https://www.realme.com/in/support/phonecheck',
    MI: 'https://www.mi.com/global/verify/#/en/tab/imei',
    MSI: 'https://account.msi.com/en/services/warranty-book',
    Apple: 'https://checkcoverage.apple.com/',
    Acer: 'https://apn.acer.co.in/Rpt/EC_CustomerView.aspx',
    Toshiba: 'https://myapps.taec.toshiba.com/myapps/admin/jsp/webrma/addRequest1NoLogin.jsp?Action=NEW',
    Panasonic: 'https://www.panasonic.com/my/support.html',
    Philips: 'https://www.philips.co.in/c-w/support-home/warranty?title=',
    Nokia: 'https://www.imei.info/check/nokia/',
    OnePlus: 'https://service.oneplus.com/in/check',
    Intex: 'https://intexcorp.com/warranty/',
    Micromax: 'https://www.imei.info/phonedatabase/phones-micromax/#google_vignette',
    Vivo: 'https://www.vivo.com/in/support/IMEI',
    Oppo: 'https://support.oppo.com/en/warranty-check/',
    iBall: 'https://warranty.ibelltools.com/registration#pills-info',
    HCL: 'https://www.hclinfosystems.in/contact-us/',
    Fujitsu: 'https://www.fujitsu.com/global/support/',
    Haier: 'https://www.haier.com/in/support/',
    Motorola: 'https://motorola-global-portal.custhelp.com/app/mcp/service',
    BlackBerry: 'https://support.blackberry.com/',
    Sharp: 'https://in.sharp/support',
    Hitachi: 'https://www.hitachiconsumer.in/support',
    Compaq: 'https://www.compaq.com/support.html', // May redirect or vary by region
    BenQ: 'https://www.benq.com/en-us/support/downloads-faq.html',
    ViewSonic: 'https://www.viewsonic.com/us/support/warranty-and-return-policy',
    Alcatel: 'https://www.alcatelmobile.com/support/',
    Coolpad: 'https://www.coolpadindia.com/contact-us/',
    Honor: 'https://www.hihonor.com/in/support/warranty-query/',
    Google: 'https://support.google.com/store/answer/6160400?hl=en', // Google device warranty policy
    Amazon: 'https://www.amazon.in/gp/help/customer/display.html?nodeId=GSPQ9ZRJSLPPX4ST', // Returns & Warranty info
    Xiaomi: 'https://www.mi.com/in/service/repair/',
    ZTE: 'https://www.ztedevices.com/support/', // ZTE global support
    Lava: 'https://www.lavamobiles.com/support/',
    Karbonn: 'https://www.karbonnmobiles.com/support',

    Meizu: 'https://www.meizu.com/en/support/', // Global support
    Blu: 'https://www.bluproducts.com/support/',

    Tecno: 'https://www.tecno-mobile.com/support/warranty/',
    Infinix: 'https://www.infinixmobility.com/support/warranty',
    LeEco: 'https://www.le.com/in/feedback.html', // LeEco's India page; not actively maintained
    BQ: 'https://www.bq.com/en/support/', // Note: BQ was a Spanish brand, now inactive

    Gionee: 'http://gionee.co.in/support',
    YU: 'http://www.yuplaygod.com/repair-status',

    Centric: 'https://www.centricmobiles.com/contact-us/',
    Celkon: 'http://www.celkonmobiles.com/contactus.php', // Limited support

    Spice: 'http://www.spice-mobile.com/contact-us/',
    Swipe: 'http://www.swipetelecom.com/support.php',
    Zopo: 'http://www.zopomobile.in/', // May redirect or be inactive
    Videocon: 'https://www.videoconworld.com/contact-us',

    iQOO: 'https://www.iqoo.com/in/support/warrantyQuery',
    Nothing: 'https://in.nothing.tech/pages/contact-support',
    Thomson: 'https://thomsontv.in/contact-us/',

    Itel: 'https://www.itel-mobile.com/in/support/',
    Ikall: 'https://ikall.in/contact-us',
    Syska: 'https://syska.co.in/contact-us',
    Alienware: 'https://www.dell.com/support/home/en-in?app=warranty', // Dell-owned
    Anker: 'https://www.anker.com/support/warranty',
    Arlo: 'https://www.arlo.com/en-us/support/',
    Aiwa: 'https://aiwaelectronics.com/pages/contact-us', // May vary by region
    AOC: 'https://aocmonitorap.com/in/support/',

    'Bang & Olufsen': 'https://www.bang-olufsen.com/en/int/support',
    Beats: 'https://support.apple.com/beats', // Owned by Apple
    Belkin: 'https://www.belkin.com/support-article/?articleNum=316623',

    Bose: 'https://www.bose.com/en_us/support.html',
    Brother: 'https://www.brother-usa.com/support/warranty',
    Canon: 'https://in.canon/en/support/warranty', // Adjust region if needed
    Casio: 'https://world.casio.com/support/',

    Corsair: 'https://www.corsair.com/us/en/warranty',
    DJI: 'https://www.dji.com/service/policy',
    Dyson: 'https://www.dyson.in/support/warranty-activation',
    Epson: 'https://www.epson.co.in/w/warranty',

    Garmin: 'https://www.garmin.com/en-IN/legal/consumer-limited-warranty/',
    GoPro: 'https://gopro.com/en/in/legal/returns-policy',
    Hisense: 'https://hisense.com/in/support',
    Humax: 'https://uk.humaxdigital.com/contact-us/', // Mostly UK-based support

    iRobot: 'https://www.irobot.in/support',
    Jabra: 'https://www.jabra.in/supportpages/warranty',
    JBL: 'https://support.jbl.com/in/en/',
    Jaybird: 'https://www.jaybirdsport.com/en-in/support.html',
    Kenwood: 'https://www.kenwoodworld.com/en-in/guarantee',
    Kingston: 'https://www.kingston.com/en/support/warranty',
    Klipsch: 'https://www.klipsch.com/warranty',
    Kodak: 'https://kodakphotoprinter.com/pages/warranty',
    Konka: 'http://en.konka.com/service/warranty.html', // Approximate, Konka site has limited warranty info
    Kyocera: 'https://www.kyoceradocumentsolutions.com/en/support/warranty.html',
    LaCie: 'https://www.lacie.com/in/en/support/warranty/',
    Logitech: 'https://support.logi.com/hc/en-in/articles/360023206674-Warranty-Information',

    'M-Audio': 'https://www.m-audio.com/support/warranty',
    Marshall: 'https://support.marshallheadphones.com/hc/en-us/articles/360038502571-Warranty',
    Medion: 'https://www.medion.com/gb/service/warranty/',
    Minolta: 'https://www.konicaminolta.com/in-en/support/warranty.html', // May redirect to contact

    Mitsubishi: 'https://www.mitsubishielectric.in/contact-us/warranty-information',
    Mobvoi: 'https://www.mobvoi.com/pages/refund-warranty-policy',
    Monoprice: 'https://www.monoprice.com/help?pn=warranty', // Often included in help
    Mophie: 'https://www.zagg.com/en_us/warranty-policies',

    Nikon: 'https://www.nikon.co.in/en_IN/service-and-support/warranty-information',
    Nubia: 'https://www.nubia.com/in/support/warranty.html', // Assumed based on structure
    Nvidia: 'https://www.nvidia.com/en-us/support/warranty/',
    Olympus: 'https://www.olympus-imaging.jp/support/warranty/english.html', // Global warranty policy

    Onkyo: 'https://www.onkyo.com/support/warranty/',
    Osram: 'https://www.osram.com/cb/services/guarantees/index.jsp',
    Pebble: 'https://www.pebblecart.com/pages/warranty-policy',
    Pentax: 'https://www.ricoh-imaging.co.in/en/warranty/',
    Philco: 'https://www.philco.com.br/suporte/termos-de-garantia', // Brazilian site – warranty terms
    Pioneer: 'https://pioneerelectronics.com/PUSA/AboutPioneer/Legal/Terms+and+Conditions+of+Sale+and+Warranty',
    Plantronics: 'https://www.poly.com/us/en/legal/warranty', // Poly by HP (formerly Plantronics)
    Polaroid: 'https://support.polaroid.com/hc/en-us/articles/115015379247-Polaroid-Warranty-Policy',
    QCY: 'https://www.qcy.com/pages/warranty-policy',
    QNAP: 'https://www.qnap.com/en/how-to/faq/article/what-is-qnap-s-product-warranty-policy',
    Razer: 'https://www.razer.com/warranty',
    Ricoh: 'https://www.ricoh.com/products/policy/warranty', // Global Ricoh policy

    Ring: 'https://support.ring.com/hc/en-us/articles/115003266946-Ring-Warranty',
    Roku: 'https://support.roku.com/article/208757068',
    Roland: 'https://www.roland.com/global/support/warranty/',
    Sagemcom: 'https://www.sagemcom.com/en/privacy-policy-and-terms-of-use', // Warranty terms not clearly listed
    SanDisk: 'https://www.westerndigital.com/support/warranty-policy',
    Sanyo: 'https://www.sanyo-av.com/support/warranty/', // May vary by country
    Sceptre: 'https://www.sceptre.com/warranty.html',
    Seagate: 'https://www.seagate.com/in/en/support/warranty-and-replacements/',

    Shure: 'https://www.shure.com/en-US/support/warranty',
    Sigma: 'https://www.sigma-global.com/en/support/warranty/',
    Skullcandy: 'https://www.skullcandy.in/pages/warranty-policy',
    Skyworth: 'https://en.skyworth.com/support', // Warranty varies by country
    Snapmaker: 'https://support.snapmaker.com/hc/en-us/articles/360046708753-Warranty-Policy',
    Soundcore: 'https://www.soundcore.com/pages/warranty-policy',
    SteelSeries: 'https://support.steelseries.com/hc/en-us/articles/115000038588-Product-Warranty-Information',
    Steren: 'https://www.steren.com.mx/garantias', // Spanish, official Steren warranty page
    TCL: 'https://www.tcl.com/in/en/support/warranty',
    Tenda: 'https://www.tendacn.com/in/service/warranty.html',
    Thermaltake: 'https://www.thermaltake.com/support/warranty',
    Tosot: 'https://www.tosotdirect.com/pages/warranty',
    TPLink: 'https://www.tp-link.com/in/support/replacement-warranty/',
    Tronsmart: 'https://www.tronsmart.com/pages/warranty-policy',
    TurtleBeach: 'https://support.turtlebeach.com/s/article/Turtle-Beach-Warranty-Information',
    Ubiquiti: 'https://www.ui.com/support/warranty/',
    Vizio: 'https://support.vizio.com/s/article/What-is-the-standard-warranty-on-my-VIZIO-product?language=en_US',
    WD: 'https://www.westerndigital.com/support/warranty-policy',
    Whirlpool: 'https://www.whirlpool.com/services/warranty.html',
    Xerox: 'https://www.xerox.com/en-us/about/warranty',
    Xgimi: 'https://xgimiprojector.in/warranty-registration',
    Yamaha: 'https://usa.yamaha.com/support/warranty/index.html',
    Yuneec: 'https://www.yuneec.com/en_US/support/warranty.html',
    Zagg: 'https://www.zagg.com/en_us/warranty-policies',
    Zebronics: 'https://zebronics.com/pages/warranty',
    Zhiyun: 'https://www.zhiyun-tech.com/en/warranty',
    Zoom: 'https://zoomcorp.com/en/us/support/warranty/', // Zoom audio, not video conferencing
    Zotac: 'https://www.zotac.com/page/product-warranty-policy',

};

export default brandLinks;