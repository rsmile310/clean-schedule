const months = [
  "01",
  "02",
  "03",
  "04",
  "05",
  "06",
  "07",
  "08",
  "09",
  "10",
  "11",
  "12",
];
$(document).ready(function () {
  const date = new Date();
  var initStartDate =
    date.getFullYear() + "-" + months[date.getMonth()] + "-" + date.getDate();

  var initEndDate =
    date.getFullYear() +
    "-" +
    months[date.getMonth() + 1] +
    "-" +
    date.getDate();

  $("#startDate").val(initStartDate);
  $("#endDate").val(initEndDate);

  $("#dataTbl").DataTable({
    aaSorting: [],
    pageLength: 10,
    lengthChange: false,
    order: true,
    order: [[0, "asc"]],
    language: {
      paginate: {
        next: '<span class="iconify" data-icon="bi:chevron-right"></span>',
        previous: '<span class="iconify" data-icon="bi:chevron-left"></span>',
      },
      search: "",
      searchPlaceholder: "Search...",
      searchIcon: '<span class="iconify" data-icon="bi:chevron-right"></span>',
    },
  });

  $("#dataTbl_length").html(
    `<div>
          <input type="date" id="startDate" name="startDate" value="` +
      initStartDate +
      `" />
          <input type="date" id="endDate" name="endDate" value="` +
      initEndDate +
      `" />
          <button id="filterBtn">FILTER</button>
      </div>`
  );

  //   get data from database
  $.ajax({
    type: "get",
    dataType: "json",
    url: "./controller/getDataController.php",
    success: function (response) {
      if (response) {
        $("#dataTbl").dataTable().fnDestroy();
        filterData(response, initStartDate, initEndDate);
        var w1 = $("td:first-child").width();
        var h3 = $("td:nth-child(3)").height();
        $("td:first-child>div").width(w1);
        $("td:first-child>div").height(h3);

        var w2 = $("td:nth-child(2)").width();
        $("td:nth-child(2)>div").width(w2);
        $("td:nth-child(2)>div").height(h3);

        $(document).scroll(function () {
          let scrollH = $(document).scrollTop();
          $("td:first-child>div").css(
            "transform",
            "translateY(-" + scrollH + "px)"
          );
          $("td:nth-child(2)>div").css(
            "transform",
            "translateY(-" + scrollH + "px)"
          );
        });

        $("#dataTbl").DataTable({
          aaSorting: [],
          pageLength: 10,
          lengthChange: false,
          order: true,
          order: [[0, "asc"]],
          language: {
            paginate: {
              next: '<span class="iconify" data-icon="bi:chevron-right"></span>',
              previous:
                '<span class="iconify" data-icon="bi:chevron-left"></span>',
            },
            search: "",
            searchPlaceholder: "Search...",
            searchIcon:
              '<span class="iconify" data-icon="bi:chevron-right"></span>',
          },
        });

        // $("a").click(function () {
        //   let scrollH = $(document).scrollTop();
        //   console.log(scrollH)

        //   $("td:first-child>div").css(
        //     "transform",
        //     "translateY(-" + scrollH + "px)"
        //   );
        //   $("td:nth-child(2)>div").css(
        //     "transform",
        //     "translateY(-" + scrollH + "px)"
        //   );
        // });
        // filter script
        $("#filterBtn").click(function () {
          $("#dataTbl").dataTable().fnDestroy();
          filterData(response, $("#startDate").val(), $("#endDate").val());
          $("td:first-child>div").width(w1);
          $("td:first-child>div").height(h3);

          $("td:nth-child(2)>div").width(w2);
          $("td:nth-child(2)>div").height(h3);

          $("#dataTbl").DataTable({
            aaSorting: [],
            pageLength: 10,
            lengthChange: false,
            order: true,
            order: [[0, "asc"]],
            language: {
              paginate: {
                next: '<span class="iconify" data-icon="bi:chevron-right"></span>',
                previous:
                  '<span class="iconify" data-icon="bi:chevron-left"></span>',
              },
              search: "",
              searchPlaceholder: "Search...",
              searchIcon:
                '<span class="iconify" data-icon="bi:chevron-right"></span>',
            },
          });
        });
      }
    },
  });

  $(".main-section").click(function () {
    let scrollH = $(document).scrollTop();
    console.log("scrollH");

    $("td:first-child>div").css("transform", "translateY(-" + scrollH + "px)");
    $("td:nth-child(2)>div").css("transform", "translateY(-" + scrollH + "px)");
  });
});

function filterData(response, startValue, endValue) {
  let data = "";
  let dd = "";
  let dateTitleArr = [];
  let dates = "";
  let num = 0;

  while (dd.valueOf() < new Date(endValue).valueOf()) {
    dd = addDays(startValue, num);
    num += 1;
    // let temp = months[new Date(dd).getMonth()] + "-" + new Date(dd).getDate();
    dateTitleArr.push(dd);
  }
  dateTitleArr.map((e) => {
    var fl = "red";
    if (
      e.toLocaleString("en-us", { weekday: "short" }).toLowerCase() === "sat" ||
      e.toLocaleString("en-us", { weekday: "short" }).toLowerCase() === "sun"
    )
      fl = "#9C0006";
    else fl = "black";

    dates +=
      `<th><div style="text-align: center">` +
      new Date(e).getDate() +
      "-" +
      e.toLocaleString("default", { month: "short" }) +
      `<p style="margin-bottom: 0; color:` +
      fl +
      `">` +
      e.toLocaleString("en-us", { weekday: "short" }) +
      `</p></div></th>`;
  });

  var title =
    `<tr>
        <th><div>AREA</div></th>
        <th><div>EQUIPMENT CODE</div></th>
        <th><div>ACTIVITY</div></th>
        ` +
    dates +
    `
      </tr>`;

  $("#dataTbl").children("thead").html(title);

  for (let i in response) {
    let dateArr = [];
    let k = 0;
    let InitDate = standardDateType(response[i].START_DATE);
    let d = "";
    while (d.valueOf() < new Date(endValue).valueOf()) {
      if (response[i].FREQUENCY.toLowerCase() == "everyday") {
        d = addDays(InitDate, k);
        k += 1;
      } else if (response[i].FREQUENCY.toLowerCase() == "weekly") {
        d = addDays(InitDate, k);
        k += 7;
      } else if (response[i].FREQUENCY.toLowerCase() == "monthly") {
        // if (new Date(InitDate).getDate() <= 28) {
        //   d = addMonth(InitDate, k);
        //   k += 1;
        // } else {
        d = addDays(InitDate, k);
        k += 31;
        // }
      } else if (response[i].FREQUENCY.toLowerCase() == "quarterly") {
        // if (new Date(InitDate).getDate() <= 28) {
        //   d = addMonth(InitDate, k);
        //   k += 3;
        // } else {
        d = addDays(InitDate, k);
        k += 93;
        // }
      } else {
        d = addDays(InitDate, k);
        k += Number(response[i].FREQUENCY);
      }
      if (d.valueOf() <= new Date(endValue).valueOf())
        dateArr.push(d.valueOf());
    }

    var filterDataArr = dateArr.filter(
      (e) => e >= new Date(startValue).valueOf()
    );

    let tdData = "";
    let flag = "";
    dateTitleArr.map((e) => {
      if (filterDataArr.indexOf(new Date(e).valueOf()) > -1)
        flag = `<svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 1200 1200"><path fill="green" d="m1004.237 99.152l-611.44 611.441l-198.305-198.305L0 706.779l198.305 198.306l195.762 195.763L588.56 906.355L1200 294.916L1004.237 99.152z"/></svg>`;
      else flag = "";
      tdData += `<td><div>` + flag + `</div></td>`;
    });

    data +=
      `<tr><td><div>` +
      response[i].AREA +
      `</div></td><td><div>` +
      response[i].EQUIPMENT_CODE +
      `</div></td><td><div>` +
      response[i].ACTIVITY +
      `<div></td>` +
      tdData +
      `</tr>`;
  }

  // data +=
  //     `<tr><td><div>` +
  //     response[i].AREA +
  //     `</div><div class="fixed-name">` +
  //     response[i].AREA +
  //     `</div></td><td><div>` +
  //     response[i].EQUIPMENT_CODE +
  //     `</div><div class="fixed-name">` +
  //     response[i].EQUIPMENT_CODE +
  //     `</div></td><td><div>` +
  //     response[i].ACTIVITY +
  //     `</div><div class="fixed-name">`+
  //     response[i].ACTIVITY +
  //     `</div></td>` +
  //     tdData +
  //     `</tr>`;
  // }
  $("#dataTbl").children("tbody").html(data);
}
function addDays(originalDate, days) {
  cloneDate = new Date(originalDate.valueOf());
  cloneDate.setDate(cloneDate.getDate() + days);
  return cloneDate;
}
function addMonth(originalDate, month) {
  cdate = new Date(originalDate.valueOf());
  cdate.setMonth(cdate.getMonth() + month);
  return cdate;
}
function standardDateType(d) {
  d = new Date(d);
  return d.getFullYear() + "-" + months[d.getMonth()] + "-" + d.getDate();
}
