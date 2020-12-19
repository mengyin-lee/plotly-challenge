// 1. Use the D3 library to read in samples.json.
let dataPromise = d3.json("./samples.json");
// select dropdown menu 
let dropdownMenu = d3.select("#selDataset");

function buildPlots(dataID) {

    // The dataPromise from the JSON samples file is named sampleData as the argument
    dataPromise.then((sampleData) => {
        console.log(sampleData);
        let otu_ids = sampleData.samples[0].otu_ids;
        console.log(otu_ids);
        let otu_labels = sampleData.samples[0].otu_labels;
        console.log (otu_labels);
        let sampleValues = sampleData.samples[0].sample_values;
        console.log(sampleValues);

// 2. Create a horizontal bar chart with a dropdown menu to display the top 10 OTUs found in that individual.
    // Use otu_ids as the labels for the bar chart.
    // Use otu_labels as the hovertext for the chart.
    // Use sample_values as the values for the bar chart.

        // get only top 10 otu ids for the plot OTU and reversing it. 
        let otu_ids_10 = otu_ids.slice(0, 10).reverse();
        // get the otu id's to the desired form for the plot
        let otu_ids_10_f = otu_ids_10.map(d => "OTU-" + d + " ");
        console.log(`OTU-ids: ${otu_ids_10_f}`);
        // get the top 10 labels for the plot
        let otu_labels_10 = otu_labels.slice(0,10);
        console.log(`OTU-labels: ${otu_labels_10}`);
        // get the top 10 sample values for the plot
        let sampleValues_10 = sampleValues.slice(0,10).reverse();
        console.log(sampleValues_10);
        
        // prepare trace for bar chart
        let trace1 = {
            x: sampleValues_10,
            y: otu_ids_10_f,
            text: otu_labels_10,

            marker: {
                color: 'blue'},
                type:"bar",
                orientation: "h"
            };
        // create data variable
        let data1 = [trace1];
        // set layout for bar plot
        let layout1 = {
            title: "Top 10 OTU per Individual Sample ID: " +dataID,
            font: { color: "#04420e", family:"Ariel, Helvetica, sans-serif"},
            yaxis:{
                tickmode:"linear",
            },
            margin: {
                l: 100,
                r: 100,
                t: 100,
                b: 30
            }
        };
        // bar plot using Plotly
        Plotly.newPlot("bar", data1, layout1);

// 3. Create a bubble chart that displays each sample.
    // Use otu_ids for the x values.
    // Use sample_values for the y values.
    // Use sample_values for the marker size.
    // Use otu_ids for the marker colors.
    // Use otu_labels for the text values.

        // // prepare trace for bubble chart
        // let trace2 = {
        //     x: otu_ids,
        //     y: sampleValues,
        //     mode: "markers",
        //     marker: {
        //         size: sampleValues,
        //         color: otu_ids
        //     },
        //     text: otu_labels
        // };
        // // set layout for bubble plot
        // let layout2 = {
        //     title: "Bacteria Cultures per Sample",
        //     xaxis:{title: "OTU (Operational Taxonomic Unit) ID: " + dataID},
        //     hovermode: "closest",
        //     font: { color: "#04420e", family:"Ariel, Helvetica, sans-serif"},
        //     height: 600,
        //     width: 1000
        // };
        // // create data variable 
        // let data2 = [trace2];
        // // bubble plot using Plotly
        // Plotly.newPlot("bubble", data2, layout2); 
    
    });
}

// 4. Display the sample metadata, i.e., an individual's demographic information.
// function displayDemo(dataID) {
//     // read the json file to get data
//     dataPromise.then((data)=> {
//         // get the metadata info for the demographic panel
//            let metadata = data.metadata;
//            console.log(metadata)
    
//         // filter meta data info by id
//            let filteredData = metadata.filter(meta => meta.id.toString() === dataID)[0];
//         // select demographic panel to put data
//            let demoInfo = d3.select("#sample-metadata");  
//         // empty the demographic info panel each time before refreshing with new id information
//            demoInfo.html("");
           
// // 5. Display each key-value pair from the metadata JSON object somewhere on the page.
//            Object.entries(filteredData).forEach(([key, value]) => {   
//                 demoInfo.append("h6").text(`${key.toUpperCase()}: ${value}`)
//             });
//         });
    // }

// 6. Update all of the plots any time that a new sample is selected
// function optionChanged(dataID) {
//     buildPlots(dataID);
//     displayDemo(dataID);
// }

// Function for initial data rendering
function init() {
    // read the data from samples json file 
    dataPromise.then((data)=> {
        console.log(data);
        // get the id data to the dropdwown menu
        data.names.forEach(function(name) {
            dropdownMenu.append("option")
                        .text(name)
                        .property("value");
        });
        // call the functions to display the data and the plots to the page
        buildPlots(data.names[0]);
        displayDemo(data.names[0]);
    });
}
        
init();