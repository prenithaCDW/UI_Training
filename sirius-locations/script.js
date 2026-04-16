$(document).ready(function () {
    //about us section
    const $tab = $(".bar-items");
    const $sections = $(".section-container .article-container");
    $sections.hide().first().css("display", "flex");
    $tab.first().addClass("active");
    $tab.each(function (index) {
        $(this).on("click", function () {
            $tab.removeClass("active");
            $(this).toggleClass("active");
            $sections.hide();
            $sections.eq(index).css("display", "flex");
        });
    });
    //solutions using accordion
    $("#accordion").accordion({
        collapsible: true,
        heightStyle: "content",
        animate: 200,
        active: 0,
        icons: {
            header: "ui-icon-triangle-1-e",
            activeHeader: "ui-icon-triangle-1-s"
        }
    });
    //locations sections created using a fragment
    const countryCodeMap = {
        "United States": "us",
        "India": "in",
        "Canada": "ca"
    };

    $.getJSON("./data/locations.json", function (data) {
        const fragment = document.createDocumentFragment();

        $.each(data, function (_, item) {
            const code = countryCodeMap[item.country];
            const imgUrl = code
                ? `https://flagcdn.com/w80/${code}.png`
                : `https://flagcdn.com/w80/un.png`;

            const $row = $('<div>').addClass('row');
            const $img = $('<img>')
                .addClass('flag')
                .attr('src', imgUrl);
            const $state = $('<span>').text(item.state).addClass("state");
            const $city = $('<span>').text(item.city).addClass("city");
            const $contact = $('<span>').text(item.contact).addClass("contact");
            $row.append($img, $state, $city, $contact);
            fragment.appendChild($row[0]);
        });
        $(".locations")[0].appendChild(fragment);
    });
});
