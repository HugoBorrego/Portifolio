function showSection(sectionId) {
    // Oculta todas as seções
    const sections = document.querySelectorAll('main section');
    sections.forEach(section => {
        section.style.display = 'none';
    });

    // Mostra a seção selecionada
    const selectedSection = document.getElementById(sectionId);
    if (selectedSection) {
        selectedSection.style.display = 'block';
    }
}

// Mostra a seção inicial quando a página é carregada
document.addEventListener('DOMContentLoaded', () => {
    showSection('home');
});

function sliceSize(dataNum, dataTotal) {
    return (dataNum / dataTotal) * 360;
}
function addSlice(sliceSize, pieElement, offset, sliceID, color) {
    $(pieElement).append("<div class='slice " + sliceID + "'><span></span></div>");
    var offset = offset - 1;
    var sizeRotation = -179 + sliceSize;
    $("." + sliceID).css({
        "transform": "rotate(" + offset + "deg) translate3d(0,0,0)"
    });
    $("." + sliceID + " span").css({
        "transform": "rotate(" + sizeRotation + "deg) translate3d(0,0,0)",
        "background-color": color
    });
}
function iterateSlices(sliceSize, pieElement, offset, dataCount, sliceCount, color) {
    var sliceID = "s" + dataCount + "-" + sliceCount;
    var maxSize = 179;
    if (sliceSize <= maxSize) {
        addSlice(sliceSize, pieElement, offset, sliceID, color);
    } else {
        addSlice(maxSize, pieElement, offset, sliceID, color);
        iterateSlices(sliceSize - maxSize, pieElement, offset + maxSize, dataCount, sliceCount + 1, color);
    }
}
function createPie(dataElement, pieElement) {
    var listData = [];
    $(dataElement + " span").each(function () {
        listData.push(Number($(this).html()));
    });
    var listTotal = 0;
    for (var i = 0; i < listData.length; i++) {
        listTotal += listData[i];
    }
    var offset = 0;
    var color = [
        "blue",
        "green",
        "orange",
        "red",
        "yelllow",
        "purple",
        "turquoise",
        "brown",
        "pink",
        "gray"
    ];
    for (var i = 0; i < listData.length; i++) {
        var size = sliceSize(listData[i], listTotal);
        iterateSlices(size, pieElement, offset, i, 0, color[i]);
        $(dataElement + " li:nth-child(" + (i + 1) + ")").css("border-color", color[i]);
        offset += size;
    }
}
createPie(".pieID.legend", ".pieID.pie");