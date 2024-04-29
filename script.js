require([
    "esri/Map",
    "esri/views/MapView",
    "esri/Graphic",
    "esri/layers/GraphicsLayer",
    "esri/geometry/Polyline",
    "dojo/domReady!"
], function(Map, MapView, Graphic, GraphicsLayer, Polyline) {
    var map = new Map({
        basemap: "topo-vector"
    });

    var view = new MapView({
        container: "map",
        map: map,
        center: [17.923597762, 60.208251508], // longitude, latitude
        zoom: 15
    });

    // Create a graphics layer for the walking trails
    var graphicsLayer = new GraphicsLayer();
    map.add(graphicsLayer);

    // Parse JSON data and add walking trails to the map
    var walkingTrailsData = JSON.parse('{"posts":[{"latitude":"60.208251508","longitude":"17.923597762"},{"latitude":"60.207757638","longitude":"17.923547917"},{"latitude":"60.207367696","longitude":"17.923277423"},{"latitude":"60.206513254","longitude":"17.922938358"},{"latitude":"60.205950959","longitude":"17.922924762"},{"latitude":"60.205673654","longitude":"17.923665947"},{"latitude":"60.205655032","longitude":"17.924831795"},{"latitude":"60.205527817","longitude":"17.925257899"},{"latitude":"60.204881391","longitude":"17.925787783"},{"latitude":"60.203935040","longitude":"17.925689128"},{"latitude":"60.202937921","longitude":"17.925251415"},{"latitude":"60.202582365","longitude":"17.924451033"},{"latitude":"60.201613634","longitude":"17.923103958"},{"latitude":"60.200796569","longitude":"17.921670171"},{"latitude":"60.200917336","longitude":"17.920721010"},{"latitude":"60.200516792","longitude":"17.920126640"},{"latitude":"60.199981825","longitude":"17.918997418"},{"latitude":"60.199669735","longitude":"17.917965689"},{"latitude":"60.199270975","longitude":"17.917272393"},{"latitude":"60.199028231","longitude":"17.915524082"},{"latitude":"60.199132593","longitude":"17.914810329"},{"latitude":"60.198386590","longitude":"17.914357322"},{"latitude":"60.198106184","longitude":"17.914690047"},{"latitude":"60.196237095","longitude":"17.910105487"},{"latitude":"60.194686332","longitude":"17.902101887"},{"latitude":"60.195749611","longitude":"17.900418182"},{"latitude":"60.196340345","longitude":"17.900746361"},{"latitude":"60.178324067","longitude":"18.172032088"},{"latitude":"60.178219314","longitude":"18.170572113"},{"latitude":"60.177405978","longitude":"18.169703151"},{"latitude":"60.177194703","longitude":"18.168890548"},{"latitude":"60.177230405","longitude":"18.167853693"},{"latitude":"60.177454577","longitude":"18.167173343"},{"latitude":"60.178238109","longitude":"18.166676160"},{"latitude":"60.178547535","longitude":"18.166758909"},{"latitude":"60.178672633","longitude":"18.166712399"},{"latitude":"60.178751009","longitude":"18.166539402"},{"latitude":"60.179235756","longitude":"18.164511852"},{"latitude":"60.179638275","longitude":"18.162871743"},{"latitude":"60.179816836","longitude":"18.162474020"},{"latitude":"60.179870516","longitude":"18.161945998"},{"latitude":"60.180368849","longitude":"18.161486374"},{"latitude":"60.180576810","longitude":"18.160791902"},{"latitude":"60.180656952","longitude":"18.159711199"},{"latitude":"60.180827585","longitude":"18.158932684"},{"latitude":"60.180950471","longitude":"18.157143489"},{"latitude":"60.181277638","longitude":"18.156574582"},{"latitude":"60.181403463","longitude":"18.156191320"},{"latitude":"60.181440853","longitude":"18.155631691"},{"latitude":"60.181522026","longitude":"18.155653612"},{"latitude":"60.182026669","longitude":"18.155135389"},{"latitude":"60.183184657","longitude":"18.154744330"},{"latitude":"60.184207583","longitude":"18.153711937"},{"latitude":"60.185054446","longitude":"18.153002403"},{"latitude":"60.185910665","longitude":"18.152375606"},{"latitude":"60.187127158","longitude":"18.151351814"},{"latitude":"60.187361423","longitude":"18.151008157"},{"latitude":"60.188087130","longitude":"18.149019858"},{"latitude":"60.188256254","longitude":"18.148419808"},{"latitude":"60.188277866","longitude":"18.147341392"},{"latitude":"60.188498699","longitude":"18.146849965"},{"latitude":"60.189036990","longitude":"18.146620413"},{"latitude":"60.189389587","longitude":"18.146452024"},{"latitude":"60.189677859","longitude":"18.145559927"},{"latitude":"60.190153029","longitude":"18.144939296"},{"latitude":"60.190486575","longitude":"18.144873282"},{"latitude":"60.191375399","longitude":"18.144892354"},{"latitude":"60.191871343","longitude":"18.144754390"},{"latitude":"60.192057422","longitude":"18.144596439"},{"latitude":"60.192207003","longitude":"18.144282002"},{"latitude":"60.192272407","longitude":"18.144068689"},{"latitude":"60.192271042","longitude":"18.144073302"},{"latitude":"60.192198222","longitude":"18.142980326"},{"latitude":"60.192322516","longitude":"18.142142061"},{"latitude":"60.192480095","longitude":"18.140910881"},{"latitude":"60.192579703","longitude":"18.138814655"},{"latitude":"60.192711605","longitude":"18.137857427"},{"latitude":"60.192699284","longitude":"18.137078453"},{"latitude":"60.192408301","longitude":"18.135510757"},{"latitude":"60.192396007","longitude":"18.134447482"},{"latitude":"60.192375011","longitude":"18.133903217"},{"latitude":"60.192275027","longitude":"18.133607186"},{"latitude":"60.192374301","longitude":"18.133330163"},{"latitude":"60.192493422","longitude":"18.133357563"},{"latitude":"60.192881292","longitude":"18.133908550"},{"latitude":"60.193122929","longitude":"18.134246755"},{"latitude":"60.193470282","longitude":"18.134337203"},{"latitude":"60.193784081","longitude":"18.134338498"},{"latitude":"60.193831497","longitude":"18.133841638"},{"latitude":"60.194014419","longitude":"18.133374180"},{"latitude":"60.194331176","longitude":"18.132807771"},{"latitude":"60.194720409","longitude":"18.131443206"},{"latitude":"60.194790378","longitude":"18.130658031"},{"latitude":"60.194686357","longitude":"18.130180362"},{"latitude":"60.194306825","longitude":"18.128855475"},{"latitude":"60.194204819","longitude":"18.127192792"},{"latitude":"60.194016921","longitude":"18.126690406"},{"latitude":"60.193770261","longitude":"18.126334373"},{"latitude":"60.193459102","longitude":"18.125917357"},{"latitude":"60.193285168","longitude":"18.124779580"},{"latitude":"60.193390053","longitude":"18.123974878"},{"latitude":"60.193010118","longitude":"18.123741153"},{"latitude":"60.192871285","longitude":"18.123156796"},{"latitude":"60.193050100","longitude":"18.121978422"},{"latitude":"60.193546353","longitude":"18.120708052"},{"latitude":"60.193962362","longitude":"18.120137631"},{"latitude":"60.194279817","longitude":"18.119680725"},{"latitude":"60.194338021","longitude":"18.119177693"},{"latitude":"60.194480949","longitude":"18.118711374"},{"latitude":"60.194521527","longitude":"18.118074387"},{"latitude":"60.194961220","longitude":"18.117245621"},{"latitude":"60.195246053","longitude":"18.116355796"},{"latitude":"60.195593306","longitude":"18.115844361"},{"latitude":"60.195554470","longitude":"18.115259805"},{"latitude":"60.195689295","longitude":"18.114875011"},{"latitude":"60.196183013","longitude":"18.114424713"},{"latitude":"60.196358903","longitude":"18.113495852"},{"latitude":"60.196674192","longitude":"18.112522895"},{"latitude":"60.196952279","longitude":"18.111918886"},{"latitude":"60.197202971","longitude":"18.111570151"},{"latitude":"60.197444661","longitude":"18.110389607"},{"latitude":"60.198061508","longitude":"18.109330530"},{"latitude":"60.198462576","longitude":"18.108652149"},{"latitude":"60.198631139","longitude":"18.107851455"},{"latitude":"60.199362386","longitude":"18.106323127"},{"latitude":"60.199829752","longitude":"18.105249777"},{"latitude":"60.200165409","longitude":"18.104622440"},{"latitude":"60.200598853","longitude":"18.103474195"},{"latitude":"60.200837634","longitude":"18.103023943"},{"latitude":"60.201499060","longitude":"18.102799875"},{"latitude":"60.201835463","longitude":"18.102444793"},{"latitude":"60.202199254","longitude":"18.103052319"},{"latitude":"60.202730324","longitude":"18.104435106"},{"latitude":"60.202963327","longitude":"18.105144932"},{"latitude":"60.203213414","longitude":"18.105125597"},{"latitude":"60.203450607","longitude":"18.105047725"},{"latitude":"60.203669719","longitude":"18.104523932"},{"latitude":"60.203791249","longitude":"18.103993390"},{"latitude":"60.204158421","longitude":"18.103452435"},{"latitude":"60.204605258","longitude":"18.102950145"},{"latitude":"60.204972341","longitude":"18.102046228"},{"latitude":"60.205739486","longitude":"18.100657031"},{"latitude":"60.206360512","longitude":"18.099110669"},{"latitude":"60.206327746","longitude":"18.098376720"},{"latitude":"60.206446530","longitude":"18.097872030"},{"latitude":"60.205950909","longitude":"18.096800633"},{"latitude":"60.205918900","longitude":"18.096339044"},{"latitude":"60.206377193","longitude":"18.094734262"},{"latitude":"60.206513262","longitude":"18.093794109"},{"latitude":"60.206561755","longitude":"18.092938844"},{"latitude":"60.206699932","longitude":"18.091890583"},{"latitude":"60.206724942","longitude":"18.089830065"},{"latitude":"60.206804184","longitude":"18.088354379"},{"latitude":"60.206953609","longitude":"18.087582139"},{"latitude":"60.207014172","longitude":"18.086382163"},{"latitude":"60.207053917","longitude":"18.084981488"},{"latitude":"60.207229028","longitude":"18.082552628"},{"latitude":"60.207275064","longitude":"18.081913981"},{"latitude":"60.207296540","longitude":"18.080683548"},{"latitude":"60.207388569","longitude":"18.077316962"},{"latitude":"60.207557148","longitude":"18.076372897"},{"latitude":"60.207705055","longitude":"18.075742206"},{"latitude":"60.208179372","longitude":"18.075069752"},{"latitude":"60.208659333","longitude":"18.075286691"},{"latitude":"60.208853146","longitude":"18.074644528"},{"latitude":"60.208953734","longitude":"18.074432886"},{"latitude":"60.209644578","longitude":"18.074167961"},{"latitude":"60.209833979","longitude":"18.073933592"},{"latitude":"60.209988251","longitude":"18.072265339"},{"latitude":"60.210813549","longitude":"18.067043904"},{"latitude":"60.210262238","longitude":"18.066594005"},{"latitude":"60.209643394","longitude":"18.065905593"},{"latitude":"60.209504490","longitude":"18.065313812"},{"latitude":"60.209531343","longitude":"18.064152544"},{"latitude":"60.209510200","longitude":"18.062631199"},{"latitude":"60.209385099","longitude":"18.061779027"},{"latitude":"60.209039718","longitude":"18.060712363"},{"latitude":"60.209093837","longitude":"18.060458796"},{"latitude":"60.209592355","longitude":"18.059422320"},{"latitude":"60.209741837","longitude":"18.058870528"},{"latitude":"60.211219147","longitude":"18.059687107"},{"latitude":"60.211219147","longitude":"18.059687107"},{"latitude":"60.211275711","longitude":"18.059635311"},{"latitude":"60.211699344","longitude":"18.056421308"},{"latitude":"60.212569719","longitude":"18.049203634"},{"latitude":"60.213774237","longitude":"18.040009280"},{"latitude":"60.212094157","longitude":"18.039251695"},{"latitude":"60.212346044","longitude":"18.032302157"},{"latitude":"60.212799751","longitude":"18.024618658"},{"latitude":"60.212106775","longitude":"18.017159226"},{"latitude":"60.212106775","longitude":"18.017159226"},{"latitude":"60.211465680","longitude":"18.010851467"},{"latitude":"60.211213410","longitude":"18.008141068"},{"latitude":"60.211127119","longitude":"18.006914941"},{"latitude":"60.211096457","longitude":"18.005751243"},{"latitude":"60.209005078","longitude":"17.998575622"},{"latitude":"60.208772958","longitude":"17.996889019"},{"latitude":"60.208458674","longitude":"17.990420251"},{"latitude":"60.210453058","longitude":"17.989170628"},{"latitude":"60.211860199","longitude":"17.987837839"},{"latitude":"60.212172855","longitude":"17.987922491"},{"latitude":"60.212434285","longitude":"17.985937469"},{"latitude":"60.212982209","longitude":"17.984266448"},{"latitude":"60.213056038","longitude":"17.983781483"},{"latitude":"60.213082968","longitude":"17.981818728"},{"latitude":"60.213363997","longitude":"17.979869669"},{"latitude":"60.213363997","longitude":"17.979869669"},{"latitude":"60.213345099","longitude":"17.979010350"},{"latitude":"60.213156655","longitude":"17.978375136"},{"latitude":"60.212710882","longitude":"17.977681455"},{"latitude":"60.211753074","longitude":"17.974574385"},{"latitude":"60.211716251","longitude":"17.974346292"},{"latitude":"60.211731092","longitude":"17.973996453"},{"latitude":"60.211887969","longitude":"17.973547104"},{"latitude":"60.211820980","longitude":"17.973105567"},{"latitude":"60.211644620","longitude":"17.972628499"},{"latitude":"60.211608035","longitude":"17.971379530"},{"latitude":"60.211636527","longitude":"17.970386210"},{"latitude":"60.211415837","longitude":"17.969662434"},{"latitude":"60.210748440","longitude":"17.968562585"},{"latitude":"60.210466845","longitude":"17.967090306"},{"latitude":"60.210501653","longitude":"17.966784422"},{"latitude":"60.210770750","longitude":"17.966317095"},{"latitude":"60.210955267","longitude":"17.966193302"},{"latitude":"60.211099931","longitude":"17.965812239"},{"latitude":"60.211554204","longitude":"17.965355429"},{"latitude":"60.211828705","longitude":"17.964958809"},{"latitude":"60.211883810","longitude":"17.964682841"},{"latitude":"60.211982492","longitude":"17.963708440"},{"latitude":"60.212205446","longitude":"17.962549371"},{"latitude":"60.212302673","longitude":"17.962206174"},{"latitude":"60.212361758","longitude":"17.961438894"},{"latitude":"60.212269560","longitude":"17.960512818"},{"latitude":"60.212505920","longitude":"17.959365838"},{"latitude":"60.212901631","longitude":"17.958235558"},{"latitude":"60.212947462","longitude":"17.957748017"},{"latitude":"60.213025356","longitude":"17.957389794"},{"latitude":"60.213142979","longitude":"17.956817401"},{"latitude":"60.213143088","longitude":"17.956169026"},{"latitude":"60.213037320","longitude":"17.955599774"},{"latitude":"60.212490477","longitude":"17.955044821"},{"latitude":"60.211651153","longitude":"17.954126430"},{"latitude":"60.211447908","longitude":"17.953209125"},{"latitude":"60.211251531","longitude":"17.952924564"},{"latitude":"60.210915631","longitude":"17.952627456"},{"latitude":"60.210427862","longitude":"17.951930404"},{"latitude":"60.210375159","longitude":"17.950844077"},{"latitude":"60.210460212","longitude":"17.950163440"},{"latitude":"60.210636264","longitude":"17.949476929"},{"latitude":"60.210677466","longitude":"17.948567594"},{"latitude":"60.210568732","longitude":"17.947799307"},{"latitude":"60.210373902","longitude":"17.947444694"},{"latitude":"60.210093487","longitude":"17.947166680"},{"latitude":"60.209910739","longitude":"17.946897438"},{"latitude":"60.209564680","longitude":"17.945798860"},{"latitude":"60.209136328","longitude":"17.944313681"},{"latitude":"60.209212007","longitude":"17.944053593"},{"latitude":"60.209486940","longitude":"17.943319758"},{"latitude":"60.209642761","longitude":"17.943173308"},{"latitude":"60.209783460","longitude":"17.942659943"},{"latitude":"60.209695449","longitude":"17.941484350"},{"latitude":"60.209585250","longitude":"17.941095229"},{"latitude":"60.209397468","longitude":"17.940579767"},{"latitude":"60.209014097","longitude":"17.939932288"},{"latitude":"60.209092903","longitude":"17.939499037"},{"latitude":"60.209257744","longitude":"17.938685082"},{"latitude":"60.209659738","longitude":"17.937822152"},{"latitude":"60.209489124","longitude":"17.937076446"},{"latitude":"60.209153986","longitude":"17.936112404"},{"latitude":"60.208917121","longitude":"17.935445108"},{"latitude":"60.208831742","longitude":"17.933302510"},{"latitude":"60.208938875","longitude":"17.932567653"},{"latitude":"60.209010346","longitude":"17.931548687"},{"latitude":"60.209763015","longitude":"17.931018940"},{"latitude":"60.210031537","longitude":"17.930979119"},{"latitude":"60.210005919","longitude":"17.929435887"},{"latitude":"60.209941550","longitude":"17.928492976"},{"latitude":"60.209245873","longitude":"17.926481732"},{"latitude":"60.208932045","longitude":"17.926006350"},{"latitude":"60.208640421","longitude":"17.925590348"},{"latitude":"60.208251505","longitude":"17.923597924"}]}');
    
    walkingTrailsData.posts.forEach(function(post, index, posts) {
        if (index < posts.length - 1) {
            var startPoint = [parseFloat(post.longitude), parseFloat(post.latitude)];
            var endPoint = [parseFloat(posts[index + 1].longitude), parseFloat(posts[index + 1].latitude)];

            var polyline = new Polyline({
                paths: [[startPoint, endPoint]],
                spatialReference: { wkid: 4326 } // Assuming WGS 1984 coordinate system
            });

            var lineSymbol = {
                type: "simple-line",
                color: [226, 119, 40], // Orange
                width: 2
            };

            var polylineGraphic = new Graphic({
                geometry: polyline,
                symbol: lineSymbol
            });

            graphicsLayer.add(polylineGraphic);
        }
    });
});