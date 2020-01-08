//this key will work on local and website.
var weatherKey = 'd9370cf81c44dc3900380fcc44da127d';

//when you create the queryURLs, you use var Gkey or var weatherKey to replace where the API key is.

$(document).ready(function () {
    //add var names here
    var submitButton = $("#submitBtn");
    var clearButton = $("#clearBtn");
    var zipcodeInput = $("#zipcodeInput");
    var usCity = $("#cityInput");

    //this is for the welcome and disclaimer
    $("#welcomeModal").addClass("is-active");

    $(".delete").click(function () {
        $("#welcomeModal").removeClass("is-active");
    });

    $("#canceled").click(function () {
        $("#welcomeModal").removeClass("is-active");
    });

    $("#userUnderstands").click(function () {
        $("#welcomeModal").removeClass("is-active");
    });

    //this is for the current date and forecast dates
    var momentDates = moment().format("MMMM Do YYYY")
    $("#currentDate").append(momentDates);

    for (i = 1; i < 6; i++) {
        var addDay = moment().add(i, 'days');
        console.log(addDay.format("MMMM Do YYYY"));

        $("#day" + i + "Date").append(addDay.format("MMMM Do YYYY"));

    };

    //I just wanted to fade the header for fun. --CL
    $(window).on('scroll', function () {
        var header = $(".hero");
        if ($(this).scrollTop() > 50) {
            if (!header.data('faded')) header.data('faded', 1).stop(true).fadeTo(400, 0.2);
        } else if (header.data('faded')) {
            header.data('faded', 0).stop(true).fadeTo(400, 1);
        }
    });

    //when page loads, weather should be default, Austin, TX. This is for current weather! 

    function queryCurrentWeather(cityName) {
        $.ajax({
            url: "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + ",us&units=imperial&appid=" + weatherKey,
            method: "GET"
        }).then(function (response) {
            //Log the resulting object
            console.log(response);

            //logging to see if query works.
            var cityEl = response.name;
            $("#cityStats").html(cityEl);
            $("#cityForecast").html("Weather Forecast: " + cityEl);

            //This is for current weather!
            var currentTempEl = response.main.temp;
            $("#currentTemp").html(currentTempEl + "&deg;F");

            //current weather conditions
            var currentConditionEl = response.weather[0].description; //this is in the icon box
            $("#currentCondition").text(currentConditionEl);
            //current weather icon
            var iconCode = response.weather[0].id;
            var flowersIcon = "wi wi-owm-" + iconCode;
            $("#currentIcon").attr('class', flowersIcon);
        });
    }

    //runs the function queryCurrentWeather
    queryCurrentWeather("Austin");

    function forecast(cityName) {
        $.ajax({
            url: "https://api.openweathermap.org/data/2.5/forecast?q=" + (cityName) + ",us&units=imperial&appid=" + weatherKey,
            method: "GET"
        }).then(function (response) {
            console.log(response);
            //THESE ARE FOR THE FORECAST!
            var tempEl1 = response.list[0].main.temp;
            console.log(tempEl1);
            $("#day1Temp").html(tempEl1 + "&deg;F");
            var day1ConditionEl = response.list[0].weather[0].description;
            $("#day1Condition").text(day1ConditionEl);
            var day1Icon = response.list[0].weather[0].id;
            var flowersD1Icon = "wi wi-owm-" + day1Icon;
            $("#day1Icon").attr('class', flowersD1Icon);

            var tempEl2 = response.list[8].main.temp;
            $("#day2Temp").html(tempEl2 + "&deg;F");
            var day2ConditionEl = response.list[8].weather[0].description;
            $("#day2Condition").text(day2ConditionEl);
            var day2Icon = response.list[8].weather[0].id;
            var flowersD2Icon = "wi wi-owm-" + day2Icon;
            $("#day2Icon").attr('class', flowersD2Icon);

            var tempEl3 = response.list[17].main.temp;
            $("#day3Temp").html(tempEl3 + "&deg;F");
            var day3ConditionEl = response.list[17].weather[0].description;
            $("#day3Condition").text(day3ConditionEl);
            var day3Icon = response.list[17].weather[0].id;
            var flowersD3Icon = "wi wi-owm-" + day3Icon;
            $("#day3Icon").attr('class', flowersD3Icon);

            var tempEl4 = response.list[26].main.temp;
            $("#day4Temp").html(tempEl4 + "&deg;F");
            var day4ConditionEl = response.list[26].weather[0].description;
            $("#day4Condition").text(day4ConditionEl);
            var day4Icon = response.list[26].weather[0].id;
            var flowersD4Icon = "wi wi-owm-" + day4Icon;
            $("#day4Icon").attr('class', flowersD4Icon);

            var tempEl5 = response.list[35].main.temp;
            $("#day5Temp").html(tempEl5 + "&deg;F");
            var day5ConditionEl = response.list[35].weather[0].description;
            $("#day5Condition").text(day5ConditionEl);
            var day5Icon = response.list[35].weather[0].id;
            var flowersD5Icon = "wi wi-owm-" + day5Icon;
            $("#day5Icon").attr('class', flowersD5Icon);
        });
    }

    //runs the forecast function
    forecast("Austin");

    //when you click on submit or press enter, run this callback function
    function callback() {
        const zipCodeRegex = /^\d{5}$/;
        if (usCity.val() != "") {
            queryCurrentWeather(usCity.val());
            forecast(usCity.val());
        }
        else if (zipCodeRegex.test(zipcodeInput[0].value) === true) {
            //runs function queryCurrentWeather with this newly assigned currentWeather
            queryCurrentWeather(zipcodeInput[0].value);
            //runs forecast function with the newly assigned queryWeather
            forecast(zipcodeInput[0].value);
        } else {
            $("#invalidZip").addClass("is-active");

            $("#canceled2").click(function () {
                $("#invalidZip").removeClass("is-active");
            });

            $("#userTriesAgain").click(function () {
                $("#invalidZip").removeClass("is-active");
            });
        }
    };

    submitButton.click(function () {
        callback();
    });

    usCity.keypress(function () {
        if (event.which == 13) callback();
    });
    zipcodeInput.keypress(function () {
        if (event.which == 13) callback();
    });

    //clear button for search div
    clearButton.on("click", function () {
        $('select option:contains("Select Dropdown")').prop('selected', true);
        usCity[0].value = "";
        zipcodeInput[0].value = "";
    });

    //dropdown option linked to clickable map info -- KI
    $("#stateDropdown").on('submitBtn', function () {
        $("#g5")
    });
});

// Links to Forest Service & BLM
// Globally naming variables  
var aTag = document.getElementById('link');
var aTag2 = document.getElementById('link2');
var aTag3 = document.getElementById('link3');
var wTag = document.getElementById('wLink');

$(document).ready(function () {

    // WILDERNESS.net - Learn About Wilderness | Appears when ANY state is clicked
    $('#g5').on('click', function () {
        wTag.setAttribute('href', "https://wilderness.net/learn-about-wilderness/default.php");
        wTag.innerText = "US Wilderness Info"
    });
    // Any other links (safety (DOGS MUST YIELD TO HORSE RIDING)) that we want to appear with ALL clicks????


    // ALAKSA -- On Clicks That Add Links to Anchor Tag (link, link2, link3, wLink)
    $('#AK').on('click', function () {
        aTag.setAttribute('href', "https://www.blm.gov/alaska");
        aTag.innerText = "Alaska BLM";
        aTag2.setAttribute('href', "https://www.fs.usda.gov/r10");
        aTag2.innerText = "Alaska Forest Service";
        aTag3.setAttribute('href', "");
        aTag3.innerText = "";
    });



    // ALABAMA -- On Clicks That Add Links to Anchor Tag (link, link2, link3, wLink)
    $('#AL').on('click', function () {
        aTag.setAttribute('href', "https://www.blm.gov/office/southeastern-states");
        aTag.innerText = "Alabama BLM";
        aTag2.setAttribute('href', "https://www.fs.usda.gov/detail/alabama/home/?cid=STELPRDB5378975");
        aTag2.innerText = "Alabama Forest Service";
        aTag3.setAttribute('href', "");
        aTag3.innerText = "";
    });

    // ARKANSAS -- On Clicks That Add Links to Anchor Tag (link, link2, link3, wLink)
    $('#AR').on('click', function () {
        aTag.setAttribute('href', "https://www.blm.gov/blog/2019-08-08/little-rock-arkansas");
        aTag.innerText = "Arkansas BLM";
        aTag2.setAttribute('href', "https://www.arkansasstateparks.com/parks/map");
        aTag2.innerText = "Arkansas Forest Service";
        aTag3.setAttribute('href', "https://www.fs.usda.gov/ouachita/");
        aTag3.innerText = "Arkansas - Ouachita National Forest";
    });



    // ARIZONA -- On Clicks That Add Links to Anchor Tag (link, link2, link3, wLink)
    $('#AZ').on('click', function () {
        aTag.setAttribute('href', "https://www.blm.gov/arizona");
        aTag.innerText = "Arizona BLM";
        aTag2.setAttribute('href', "https://www.fs.usda.gov/tonto/");
        aTag2.innerText = "Arizona Forest Service";
        aTag3.setAttribute('href', "");
        aTag3.innerText = "";
    });


    // CALIFORNIA -- On Clicks That Add Links to Anchor Tag (link, link2, link3, wLink)
    $('#CA').on('click', function () {
        aTag.setAttribute('href', "https://www.blm.gov/california");
        aTag.innerText = "Califonia BLM";
        aTag2.setAttribute('href', "https://www.fs.usda.gov/detail/r5/about-region/?cid=stelprdb5274212");
        aTag2.innerText = "California Forest Service";
        aTag3.setAttribute('href', "");
        aTag3.innerText = "";
    });



    // COLORADO -- On Clicks That Add Links to Anchor Tag (link, link2, link3, wLink)
    $('#CO').on('click', function () {
        aTag.setAttribute('href', "https://www.blm.gov/colorado");
        aTag.innerText = "Colorado BLM";
        aTag2.setAttribute('href', "https://www.fs.fed.us/r2/recreation/map/colorado/html-current/colorado-hi-speed-index.shtml");
        aTag2.innerText = "Colorado Forest Service";
        aTag3.setAttribute('href', "");
        aTag3.innerText = "";

    });



    // CONNECTICUT -- On Clicks That Add Links to Anchor Tag (link, link2, link3, wLink)
    $('#CT, .CT-btn').on('click', function () {
        aTag.setAttribute('href', "https://www.blm.gov/office/northeastern-states");
        aTag.innerText = "Connecticut BLM";
        aTag2.setAttribute('href', "https://www.fs.fed.us/ivm/");
        aTag2.innerText = "Connecticut Forest Service";
        aTag3.setAttribute('href', "");
        aTag3.innerText = "";
    });

    // DELAWARE -- On Clicks That Add Links to Anchor Tag (link, link2, link3, wLink)
    $('#DE, .DE-btn').on('click', function () {
        aTag.setAttribute('href', "https://www.blm.gov/office/northeastern-states");
        aTag.innerText = "Delaware BLM";
        aTag2.setAttribute('href', "https://www.fs.fed.us/ivm/");
        aTag2.innerText = "Delaware Forest Service";
        aTag3.setAttribute('href', "");
        aTag3.innerText = "";


    });


    // FLORIDA -- On Clicks That Add Links to Anchor Tag (link, link2, link3, wLink)
    $('#FL').on('click', function () {
        aTag.setAttribute('href', "https://www.blm.gov/office/southeastern-states");
        aTag.innerText = "Florida BLM";
        aTag2.setAttribute('href', "https://www.fs.usda.gov/florida");
        aTag2.innerText = "Florida Forest Service";

        aTag3.setAttribute('href', "");
        aTag3.innerText = "";

    });


    // GEORGIA -- On Clicks That Add Links to Anchor Tag (link, link2, link3, wLink)
    $('#GA').on('click', function () {
        aTag.setAttribute('href', "https://www.blm.gov/office/southeastern-states");
        aTag.innerText = "Georgia BLM";
        aTag2.setAttribute('href', "https://www.fs.usda.gov/conf");
        aTag2.innerText = "Georgia Forest Service";
        aTag3.setAttribute('href', "");
        aTag3.innerText = "";
    });


    // HAWAI'I -- On Clicks That Add Links to Anchor Tag (link, link2, link3, wLink)
    $('#HI').on('click', function () {
        aTag.setAttribute('href', "https://camping.ehawaii.gov/camping/welcome.html");
        aTag.innerText = "Hawai'i Camping Reservation System";
        aTag2.setAttribute('href', "https://www.fs.usda.gov/detail/r5/about-region/?cid=stelprdb5274212");
        aTag2.innerText = "Hawai'i Forest Service";
        aTag3.setAttribute('href', "");
        aTag3.innerText = "";

    });


    // IDAHO -- On Clicks That Add Links to Anchor Tag (link, link2, link3, wLink)
    $('#ID').on('click', function () {
        aTag.setAttribute('href', "https://www.blm.gov/idaho");
        aTag.innerText = "Idaho BLM";
        aTag2.setAttribute('href', "https://www.fs.usda.gov/detail/r5/about-region/?cid=stelprdb5274212");
        aTag2.innerText = "Idaho Panhandle Forest Service";

        aTag3.setAttribute('href', "https://www.fs.usda.gov/boise");
        aTag3.innerText = "Idaho Boise Forest Service";

    });

    // ILLINOIS -- On Clicks That Add Links to Anchor Tag (link, link2, link3, wLink)
    $('#IL').on('click', function () {
        aTag.setAttribute('href', "https://www.blm.gov/about/what-we-manage/eastern-states");
        aTag.innerText = "Illinois BLM";
        aTag2.setAttribute('href', "https://www.fs.usda.gov/shawnee");
        aTag2.innerText = "Illinois Forest Service";
        aTag3.setAttribute('href', "https://www.dnr.illinois.gov/Parks/Pages/default.aspx");
        aTag3.innerText = "Illinois State Parks";

    });


    // INDIANA -- On Clicks That Add Links to Anchor Tags:(link, link2, link3, wLink)
    $('#IN').on('click', function () {
        aTag.setAttribute('href', "https://www.blm.gov/about/what-we-manage/eastern-states");
        aTag.innerText = "Indiana BLM";
        aTag2.setAttribute('href', "https://www.fs.usda.gov/hoosier/");
        aTag2.innerText = "Indiana Forest Service";
        aTag3.setAttribute('href', "https://www.in.gov/dnr/parklake/");
        aTag3.innerText = "Indiana State Parks";

    });



    // IOWA -- On Clicks That Add Links to Anchor Tag (link, link2, link3, wLink)
    $('#IA').on('click', function () {
        aTag.setAttribute('href', "https://www.blm.gov/about/what-we-manage/eastern-states");
        aTag.innerText = "Iowa BLM";
        aTag2.setAttribute('href', "https://www.fs.fed.us/ivm/");
        aTag2.innerText = "Iowa Forest Service";
        aTag3.setAttribute('href', "");
        aTag3.innerText = "";
    });


    // KANSAS -- On Clicks That Add Links to Anchor Tag (link, link2, link3, wLink)
    $('#KS').on('click', function () {
        aTag.setAttribute('href', "https://www.blm.gov/new-mexico");
        aTag.innerText = "Kansas BLM";
        aTag2.setAttribute('href', "https://www.fs.fed.us/ivm/");
        aTag2.innerText = "Kansas Forest Service";
        aTag3.setAttribute('href', "");
        aTag3.innerText = "";

    });


    // KENTUCKY -- On Clicks That Add Links to Anchor Tag (link, link2, link3, wLink)
    $('#KY').on('click', function () {
        aTag.setAttribute('href', "https://www.fs.usda.gov/gwj");
        aTag.innerText = "Kentucky - George Washington & Jefferson NF";
        aTag2.setAttribute('href', "https://www.fs.usda.gov/dbnf/");
        aTag2.innerText = "Kentucky - Daniel Boone NF";
        aTag3.setAttribute('href', "https://www.landbetweenthelakes.us/");
        aTag3.innerText = "Kentucky - Land Between the Lakes NF";

    });



    // LOUISIANA -- On Clicks That Add Links to Anchor Tag (link, link2, link3, wLink)
    $('#LA').on('click', function () {
        aTag.setAttribute('href', "https://www.blm.gov/about/what-we-manage/eastern-states");
        aTag.innerText = "Louisiana BLM";
        aTag2.setAttribute('href', "https://www.fs.usda.gov/kisatchie");
        aTag2.innerText = "Louisiana - Kisatchie National Forest";
        aTag3.setAttribute('href', "");
        aTag3.innerText = "";

    });

    // MAINE -- On Clicks That Add Links to Anchor Tag (link, link2, link3, wLink)
    $('#ME').on('click', function () {
        aTag.setAttribute('href', "https://www.nps.gov/acad/index.htm");
        aTag.innerText = "Maine - Acadia Nationsl Park";
        aTag2.setAttribute('href', "https://www.fs.usda.gov/whitemountain");
        aTag2.innerText = "Maine - White Mountain National Forest";
        aTag3.setAttribute('href', "https://www.fs.fed.us/ivm/");
        aTag3.innerText = "National Forest Map";

    });


    // MARYLAND -- On Clicks That Add Links to Anchor Tag (link, link2, link3, wLink)
    $('#MD, .MD-btn').on('click', function () {
        aTag.setAttribute('href', "https://www.blm.gov/about/what-we-manage/eastern-states");
        aTag.innerText = "Maryland BLM";
        aTag2.setAttribute('href', "https://dnr.maryland.gov/Publiclands/Pages/parkmap.aspx");
        aTag2.innerText = "Maryland State Parks";
        aTag3.setAttribute('href', "https://dnr.maryland.gov/Wildlife/Pages/publiclands/home.aspx");
        aTag3.innerText = "Maryland - Wildlife and Heritage Service";


    });

    // MASSACHUSETTS -- On Clicks That Add Links to Anchor Tag (link, link2, link3, wLink)
    $('#MA, .MA-btn').on('click', function () {
        aTag.setAttribute('href', "https://www.blm.gov/about/what-we-manage/eastern-states");
        aTag.innerText = "Massachusetts BLM";
        aTag2.setAttribute('href', "https://www.fs.fed.us/ivm/");
        aTag2.innerText = "Massachusetts Natioanal Forest";
        aTag3.setAttribute('href', "https://www.mass.gov/guides/guide-to-recreation-in-state-parks");
        aTag3.innerText = "Massachusetts State Parks";

    });


    // MICHIGAN -- On Clicks That Add Links to Anchor Tag (link, link2, link3, wLink)
    $('#MI').on('click', function () {
        aTag.setAttribute('href', "https://www.fs.usda.gov/ottawa/");
        aTag.innerText = "Michigan - Ottawa National Forest";
        aTag2.setAttribute('href', "https://www.fs.usda.gov/hiawatha");
        aTag2.innerText = "Michigan - Hiawatha National Forest";
        aTag3.setAttribute('href', "https://www.fs.usda.gov/hmnf/");
        aTag3.innerText = "Michigan - Huron-Mainstee National Forest";

    });



    // MINNESOTA -- On Clicks That Add Links to Anchor Tag (link, link2, link3, wLink)
    $('#MN').on('click', function () {
        aTag.setAttribute('href', "https://www.blm.gov/about/what-we-manage/eastern-states");
        aTag.innerText = "Minnesota BLM";
        aTag2.setAttribute('href', "https://www.fs.usda.gov/superior/");
        aTag2.innerText = "Minnesota - Superior National Forest";
        aTag3.setAttribute('href', "https://www.fs.usda.gov/chippewa");
        aTag3.innerText = "Minnesota - Chippewa National Forest";

    });



    // MISSISSIPPI -- On Clicks That Add Links to Anchor Tag (link, link2, link3, wLink)
    $('#MS').on('click', function () {
        aTag.setAttribute('href', "https://www.blm.gov/about/what-we-manage/eastern-states");
        aTag.innerText = "Mississippi BLM";
        aTag2.setAttribute('href', "https://www.fs.usda.gov/mississippi/");
        aTag2.innerText = "Mississippi National Forests";
        aTag3.setAttribute('href', "");
        aTag3.innerText = "";

    });


    // MISSOURI -- On Clicks That Add Links to Anchor Tag (link, link2, link3, wLink)
    $('#MO').on('click', function () {
        aTag.setAttribute('href', "https://www.blm.gov/about/what-we-manage/eastern-states");
        aTag.innerText = "Missouri BLM";
        aTag2.setAttribute('href', "https://www.fs.usda.gov/mtnf");
        aTag2.innerText = "Missouri - Mark Twain NF";
        aTag3.setAttribute('href', "https://mostateparks.com/");
        aTag3.innerText = "Missouri State Parks";

    });

    // MONTANA -- On Clicks That Add Links to Anchor Tag (link, link2, link3, wLink)
    $('#MT').on('click', function () {
        aTag.setAttribute('href', "https://www.blm.gov/montana-dakotas");
        aTag.innerText = "Montana BLM";
        aTag2.setAttribute('href', "https://www.hipcamp.com/discover/montana/national-forests");
        aTag2.innerText = "Montana - National Forests";
        aTag3.setAttribute('href', "https://wildmontana.org/");
        aTag3.innerText = "Montana Wilderness Association";

    });


    // NEBRASKA -- On Clicks That Add Links to Anchor Tag (link, link2, link3, wLink)
    $('#NE').on('click', function () {
        aTag.setAttribute('href', "https://www.blm.gov/montana-dakotas");
        aTag.innerText = "Nebraska BLM";
        aTag2.setAttribute('href', "https://www.fs.usda.gov/nebraska");
        aTag2.innerText = "Nebraska - National Forests";
        aTag3.setAttribute('href', "");
        aTag3.innerText = "";

    });


    // NEVADA -- On Clicks That Add Links to Anchor Tag (link, link2, link3, wLink)
    $('#NV').on('click', function () {
        aTag.setAttribute('href', "https://www.blm.gov/nevada");
        aTag.innerText = "Nevada BLM";
        aTag2.setAttribute('href', "https://www.fs.usda.gov/htnf/");
        aTag2.innerText = "Nevada - Humboldt-Toiyabe NF";
        aTag3.setAttribute('href', "http://parks.nv.gov/");
        aTag3.innerText = "Nevada State Parks";


    });


    // NEW HAMPSHIRE -- On Clicks That Add Links to Anchor Tag (link, link2, link3, wLink)
    $('#NH, .NH-btn').on('click', function () {
        aTag.setAttribute('href', "https://www.blm.gov/about/what-we-manage/eastern-states");
        aTag.innerText = "New Hampshire BLM";
        aTag2.setAttribute('href', "https://www.fs.usda.gov/whitemountain");
        aTag2.innerText = "New Hampshire - White Mountain NF";
        aTag3.setAttribute('href', "https://www.fs.fed.us/ivm/");
        aTag3.innerText = "National Forest Map";

    });


    // NEW JERSEY -- On Clicks That Add Links to Anchor Tag (link, link2, link3, wLink)
    $('#NJ, .NJ-btn').on('click', function () {
        aTag.setAttribute('href', "https://www.blm.gov/about/what-we-manage/eastern-states");
        aTag.innerText = "New Jersey BLM";
        aTag2.setAttribute('href', "https://www.state.nj.us/dep/parksandforests/");
        aTag2.innerText = "New Jersey State Parks";
        aTag3.setAttribute('href', "https://www.fs.fed.us/ivm/");
        aTag3.innerText = "National Forest Map";

    });


    // NEW MEXICO -- On Clicks That Add Links to Anchor Tag (link, link2, link3, wLink)
    $('#NM').on('click', function () {
        aTag.setAttribute('href', "https://www.blm.gov/new-mexico");
        aTag.innerText = "New Mexico BLM";
        aTag2.setAttribute('href', "https://www.fs.fed.us/sopa/state-level.php?nm");
        aTag2.innerText = "New Mexico Forest Service";
        aTag3.setAttribute('href', "");
        aTag3.innerText = "";

    });


    // NEW YORK -- On Clicks That Add Links to Anchor Tag (link, link2, link3, wLink)
    $('#NY').on('click', function () {
        aTag.setAttribute('href', "https://www.blm.gov/about/what-we-manage/eastern-states");
        aTag.innerText = "New York BLM";
        aTag2.setAttribute('href', "https://www.fs.usda.gov/main/gmfl/home");
        aTag2.innerText = "New York - Green Mountain & Finger Lakes NF";
        aTag3.setAttribute('href', "https://parks.ny.gov/parks/");
        aTag3.innerText = "North York State Parks";

    });



    // NORTH CAROLINA -- On Clicks That Add Links to Anchor Tag (link, link2, link3, wLink)
    $('#NC').on('click', function () {
        aTag.setAttribute('href', "https://www.blm.gov/about/what-we-manage/eastern-states");
        aTag.innerText = "North Carolina BLM";
        aTag2.setAttribute('href', "https://www.fs.usda.gov/nfsnc/");
        aTag2.innerText = "North Carolina National Forests";
        aTag3.setAttribute('href', "https://www.ncparks.gov/");
        aTag3.innerText = "North Carolina State Parks";

    });

    // NORTH DAKOTA -- On Clicks That Add Links to Anchor Tag (link, link2, link3, wLink)
    $('#ND').on('click', function () {
        aTag.setAttribute('href', "https://www.blm.gov/montana-dakotas");
        aTag.innerText = "North Dakota BLM";
        aTag2.setAttribute('href', "https://www.fs.usda.gov/dpg");
        aTag2.innerText = "North Dakota - Dakota Prairie Grasslands";
        aTag3.setAttribute('href', "https://www.parkrec.nd.gov/");
        aTag3.innerText = "North Dakota State Parks";

    });


    // OHIO -- On Clicks That Add Links to Anchor Tag (link, link2, link3, wLink)
    $('#OH').on('click', function () {
        aTag.setAttribute('href', "https://www.blm.gov/about/what-we-manage/eastern-states");
        aTag.innerText = "Ohio BLM";
        aTag2.setAttribute('href', "https://www.fs.usda.gov/wayne/");
        aTag2.innerText = "Ohio - Wayne National Forest";
        aTag3.setAttribute('href', "http://parks.ohiodnr.gov/");
        aTag3.innerText = "Ohio State Parks";

    });


    // OKLAHOMA -- On Clicks That Add Links to Anchor Tag (link, link2, link3, wLink)
    $('#OK').on('click', function () {
        aTag.setAttribute('href', "https://www.blm.gov/new-mexico");
        aTag.innerText = "Oklahoma BLM";
        aTag2.setAttribute('href', "https://www.fs.usda.gov/ouachita/");
        aTag2.innerText = "Oklahoma - Ouachita National Forest";
        aTag3.setAttribute('href', "https://www.travelok.com/state-parks");
        aTag3.innerText = "Oklahoma State Parks";

    });



    // OREGON -- On Clicks That Add Links to Anchor Tag (link, link2, link3, wLink)
    $('#OR').on('click', function () {
        aTag.setAttribute('href', "https://www.blm.gov/oregon-washington");
        aTag.innerText = "Oregon BLM";
        aTag2.setAttribute('href', "https://www.fs.usda.gov/detail/r6/home/?cid=fsbdev2_026675#oregon");
        aTag2.innerText = "Oregon National Forests";
        aTag3.setAttribute('href', "https://oregonstateparks.org/");
        aTag3.innerText = "Oregon State Parks";

    });


    // PENNSYLVANIA -- On Clicks That Add Links to Anchor Tag (link, link2, link3, wLink)
    $('#PA').on('click', function () {
        aTag.setAttribute('href', "https://www.blm.gov/about/what-we-manage/eastern-states");
        aTag.innerText = "Pennsylvania BLM";
        aTag2.setAttribute('href', "https://www.fs.usda.gov/allegheny/");
        aTag2.innerText = "Pennsylvania - Alleghany National Forest";
        aTag3.setAttribute('href', "https://www.dcnr.pa.gov/StateForests/Pages/default.aspx");
        aTag3.innerText = "Pennsylvania State Forests";

    });


    // RHODE ISLAND -- On Clicks That Add Links to Anchor Tag (link, link2, link3, wLink)

    $("#RI, .RI-btn").on('click', function () {
        aTag2.setAttribute('href', "https://www.fs.fed.us/ivm/");
        aTag2.innerText = "National Forest Map";
        aTag3.setAttribute('href', "http://www.riparks.com/");
        aTag3.innerText = "Rhode Island State Parks";
        aTag.setAttribute('href', "https://www.blm.gov/about/what-we-manage/eastern-states");
        aTag.innerText = "Rhode Island BLM";
    });


    // SOUTH CAROLINA -- On Clicks That Add Links to Anchor Tag (link, link2, link3, wLink)
    $('#SC').on('click', function () {
        aTag.setAttribute('href', "https://www.blm.gov/about/what-we-manage/eastern-states");
        aTag.innerText = "South Carolina BLM";
        aTag2.setAttribute('href', "https://www.fs.usda.gov/scnfs");
        aTag2.innerText = "South Carolina - Francis Marion & Sumter NF";
        aTag3.setAttribute('href', "https://southcarolinaparks.com/");
        aTag3.innerText = "South Carolina State Parks";

    });




    // SOUTH DAKOTA -- On Clicks That Add Links to Anchor Tag (link, link2, link3, wLink)
    $('#SD').on('click', function () {
        aTag.setAttribute('href', "https://www.blm.gov/montana-dakotas");
        aTag.innerText = "South Dakota BLM";
        aTag2.setAttribute('href', "https://www.fs.usda.gov/blackhills");
        aTag2.innerText = "South Dakota - Black Hills NF";
        aTag3.setAttribute('href', "https://gfp.sd.gov/parks/");
        aTag3.innerText = "South Dakota State Parks";

    });





    // TENNESSEE -- On Clicks That Add Links to Anchor Tag (link, link2, link3, wLink)
    $('#TN').on('click', function () {
        aTag.setAttribute('href', "https://www.blm.gov/about/what-we-manage/eastern-states");
        aTag.innerText = "Tennessee BLM";
        aTag2.setAttribute('href', "https://www.fs.usda.gov/cherokee/");
        aTag2.innerText = "Tennessee - Cherokee National Forest";
        aTag3.setAttribute('href', "https://tnstateparks.com/");
        aTag3.innerText = "Tennessee State Parks";

    });





    // TEXAS -- On Clicks That Add Links to Anchor Tag (link, link2, link3, wLink)
    $('#TX').on('click', function () {
        aTag.setAttribute('href', "https://www.blm.gov/new-mexico");
        aTag.innerText = "Texas BLM";
        aTag2.setAttribute('href', "https://www.fs.usda.gov/texas");
        aTag2.innerText = "Texas National Forests";
        aTag3.setAttribute('href', "https://tpwd.texas.gov/state-parks/");
        aTag3.innerText = "Texas State Parks";

    });

 



    // UTAH -- On Clicks That Add Links to Anchor Tag (link, link2, link3, wLink)
    $('#UT').on('click', function () {
        aTag.setAttribute('href', "https://www.blm.gov/utah");
        aTag.innerText = "Utah BLM";
        aTag2.setAttribute('href', "https://utah.com/campgrounds");
        aTag2.innerText = "Utah Campgrounds";
        aTag3.setAttribute('href', "https://stateparks.utah.gov/");
        aTag3.innerText = "Utah State Parks";

    });





    // VERMONT -- On Clicks That Add Links to Anchor Tag (link, link2, link3, wLink)
    $('#VT, .VT-btn').on('click', function () {
        aTag.setAttribute('href', "https://www.blm.gov/about/what-we-manage/eastern-states");
        aTag.innerText = "Vermont BLM";
        aTag2.setAttribute('href', "https://www.fs.usda.gov/wps/portal/fsinternet/cs/main/!ut/p/z0/04_Sj9CPykssy0xPLMnMz0vMAfIjo8zijQwgwNHCwN_DI8zPwBcqYKBfkO2oCADIwpjI/?pname=Green%20Mountain-%20Home&navtype=BROWSEBYSUBJECT&ss=110920&pnavid=null&navid=091000000000000&cid=FSE_003853");
        aTag2.innerText = "Vermont - Green Mountain & Finger Lakes NF";
        aTag3.setAttribute('href', "https://vtstateparks.com/");
        aTag3.innerText = "Vermont State Parks";

    });






    // VIRGINIA -- On Clicks That Add Links to Anchor Tag (link, link2, link3, wLink)
    $('#VA').on('click', function () {
        aTag.setAttribute('href', "https://www.blm.gov/about/what-we-manage/eastern-states");
        aTag.innerText = "Virginia BLM";
        aTag2.setAttribute('href', "https://www.fs.usda.gov/gwj");
        aTag2.innerText = "Virginia - George Washington NF";
        aTag3.setAttribute('href', "https://www.dcr.virginia.gov/state-parks/");
        aTag3.innerText = "Virginia State Parks";

    });





    // WASHINGTON -- On Clicks That Add Links to Anchor Tag (link, link2, link3, wLink)
    $('#WA').on('click', function () {
        aTag.setAttribute('href', "https://www.blm.gov/oregon-washington");
        aTag.innerText = "Washington BLM";
        aTag2.setAttribute('href', "https://www.fs.usda.gov/detail/r6/home/?cid=fsbdev2_026675#washington");
        aTag2.innerText = "Washington National Forests";
        aTag3.setAttribute('href', "https://www.parks.wa.gov/");
        aTag3.innerText = "Washington State Parks";

    });





    // WEST VIRGINIA -- On Clicks That Add Links to Anchor Tag (link, link2, link3, wLink)
    $('#WV').on('click', function () {
        aTag.setAttribute('href', "https://www.blm.gov/about/what-we-manage/eastern-states");
        aTag.innerText = "West Virginia BLM";
        aTag2.setAttribute('href', "https://www.fs.usda.gov/mnf");
        aTag2.innerText = "West Virginia - Monongahela NF";
        aTag3.setAttribute('href', "https://www.fs.usda.gov/gwj");
        aTag3.innerText = "West Virginia - George Washington NF";

    });






    // WISCONSIN -- On Clicks That Add Links to Anchor Tag (link, link2, link3, wLink)
    $('#WI').on('click', function () {
        aTag.setAttribute('href', "https://www.blm.gov/visit/wisconsin-river-islands-in-wisconsin-rapids%20");
        aTag.innerText = "Wisconsin BLM";
        aTag2.setAttribute('href', "https://www.fs.usda.gov/cnnf/");
        aTag2.innerText = "Wisconsin - Chequamegon-Nicolet NF";
        aTag3.setAttribute('href', "https://dnr.wi.gov/topic/parks/");
        aTag3.innerText = "Wisconsin State Parks";

    });




    // WYOMING -- On Clicks That Add Links to Anchor Tag (link, link2, link3, wLink)
    $('#WY').on('click', function () {
        aTag.setAttribute('href', "https://www.blm.gov/wyoming");
        aTag.innerText = "Wyoming BLM";
        aTag2.setAttribute('href', "https://travelwyoming.com/national-forests");
        aTag2.innerText = "Wyoming National Forests";
        aTag3.setAttribute('href', "https://wyoparks.wyo.gov/");
        aTag3.innerText = "Wyoming State Parks";

    });





});
// ^^^ Links to Forest Service & BLM ^^^




// Links to Forest Service and BLM appear when state is clicked



// script for clickable map -- KI
$("path, circle").hover(function (e) {
    $('#info-box').css('display', 'block');
    $('#info-box').html($(this).data('info'));
});

$("path, circle").mouseleave(function (e) {
    //$('#info-box').css('display', 'none');
});

$(document).mousemove(function (e) {
    // $('#info-box').css('top', e.pageY - $('#info-box').height() - 30);
    // $('#info-box').css('left', e.pageX - ($('#info-box').width()) / 2);
}).mouseover();

var ios = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
if (ios) {
    $('a').on('click touchend', function () {
        var link = $(this).attr('href');
        window.open(link, '_blank');
        return false;
    });
}
