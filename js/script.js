$(function () {
  $("select").on("change", function () {
    const selected = this.value;
    console.log(selected);
    $(".loading").hide();
    if (selected) {
      $(".news").html("");
      $(".loading").show();
      $.ajax({
        method: 'get',
        url: 'https://api.nytimes.com/svc/topstories/v2/' + selected + '.json?api-key=alYugfrp3RdqSfgCoGsAZAv5aAtHX2DH'
      })
        .done(function (data) {
          const filteredData = data.results
            .filter(function (article) {
              return article.multimedia[4] !== undefined
            }).slice(0, 12)
          $.each(filteredData, function (key, value) {
            const articleUrl = value.url;
            const articleMedia = value.multimedia[4].url;
            const articleTitle = value.title;
            const articleContent = value.abstract;
            $(".news").append(
            `<div class="news-list">
            <a href="${articleUrl}"><div class="bg-image" style="background-image: url(${articleMedia});" alt="${articleTitle}">
            <p>${articleContent}</p></a></div>`
            );
          });
        })
        .fail(function () {
          $(".news").append(`<p>oops!</p>`)
        })
        .always(function () {
          $(".loading").hide();
        }); // End of fail & always
    }; // End of If
  }); // End of Change
}); // End of JavaScript