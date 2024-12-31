// select the DOM elements for output
const yearPara = document.querySelector("#year");
const dateModifiedPara = document.querySelector("#date-modified");

// using the date object
const today = new Date();

// This code will display current year in first paragraph
yearPara.innerHTML = `Copyright©️: <span class="highlight">${today.getFullYear()}</span> Eseinone Code Hub 🗽 | All rights reserved🗽`;

// This code will display date modified in second paragraph
dateModifiedPara.innerHTML = `Date Modified: <span class="highlight">${new Intl.DateTimeFormat(
	"en-US",
	{
		dateStyle: "short"
	}
).format(today)} ${today.toLocaleTimeString()}</span>`;