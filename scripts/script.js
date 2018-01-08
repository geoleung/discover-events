const segmentCategories = [
    'Arts & Theatre',
    'Film',
    'Music',
    'Sports'
];

const appLocate = {};

appLocate.key = 'vdvmGy6E9WEAZoQwyOCnat446poixTTz';

appLocate.getEvents = function(location, date, category) {
    $.ajax({
        url: 'https://app.ticketmaster.com/discovery/v2/events.json?countryCode=CA',
        method: 'GET',
        dataType: 'json',
        data: {
            apikey: appLocate.key,
            size: '12',
            city: location,
            startDateTime: date,
            sort: 'date,asc',
            classificationName: category
        }
    }).then(function(res) {
        console.log(res);
        
        appLocate.displayEvents(res._embedded.events);
    });
};

appLocate.displayResults = function() {
    $('.searchResults').hide();
    $('.mainSubmission').on('submit', function(e) {
        e.preventDefault();
        $('.searchResults').show();
        $('html').animate({scrollTop: $('.searchResults').offset().top}, 1000);
        // $('.mainSubmission').hide();
    });
};

appLocate.getCity = function() {
    $('form').on('submit', function(e) {
        e.preventDefault();
        let cityName = $('#city').val();
        let chosenDate = new Date($('#startDate').val());
        chosenDate.setHours(24, 00, 00, 000);
        let stringDate = chosenDate.toISOString().split('.')[0]+"Z";
        // console.log($('#startDate').val());
        // console.log(chosenDate.toISOString().split('.')[0]+"Z");
        let segment = $('#categories').find(':selected').text();
            if (segment === 'Any') {
                segment = '';
            }

        appLocate.getEvents(cityName, stringDate, segment);
        $('.container').empty();
        // console.log(chosenDate, stringDate);
    });
};

appLocate.displayEvents = function(eventArray) {
    // console.log('eventArray', eventArray);
    const select = eventArray.map((attraction) => {
        return {
            name: attraction.name,
            date: attraction.dates.start.localDate,
            genre: attraction.classifications['0'].segment['name'],
            link: attraction.url
        }
    });
    select.forEach((item) => {
        // console.log('item', item);
        const eventName = $('<h2>').text(item.name);
        const dateTime = $('<p>').addClass('date').text(item.date);
        const classification = $('<p>').addClass('genre').text(item.genre);
        const openView = $('<button>').append('View on Ticketmaster');
        const linkToPage = $('<a>').prop('href', item.link);
        const detailedAttraction = $('<div>').addClass('attraction').append(eventName, dateTime, classification, openView, linkToPage);
        $('.container').append(detailedAttraction);
    });
    
    $('button').on('click', function() {
        let goToPage = $(this).siblings('a').attr('href');
        console.log(goToPage);
        window.open(goToPage);
    });
};

appLocate.goHome = function() {
    $('a').on('click', (e) => {
        e.preventDefault();
        console.log('clicked');
    });
    $('a').smoothScroll({
        speed: 1000
    });
};

appLocate.init = function() {
    appLocate.displayResults();
    appLocate.getCity();
    appLocate.goHome();
};

$(function() {
    appLocate.init();
});



// Prompt user to input a city and starting date
// Check if any other filters have been applied
// Using inputs, filter data query parameters to get results related to the inputs entered
// Display 3-5 results back to the user 
// If user clicks on a result item, show a 'add to wishlist button'
// If user clicks on wishlist button, push result item to wishlist array and populate Wishlist Page
// Remove selected result item from page and add another result item to the page
// On Wishlist Page, if user clicks on 'X' button, display confirmation to ask user confirm if they want to remove the item from the list


// On 'Any', filter to show one result from each category

// Reduce results to show 3-5 on a page
// Limit loop to run only a few times
// Use a filter to limit results so that they are not repeated more than once
// When a result is removed, run a loop to generate another result to replace it


