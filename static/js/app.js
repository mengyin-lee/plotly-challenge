let dataPromise = d3.json("./samples.json");

function buildPlots(id) {
// 1. Use the D3 library to read in samples.json.
    // The data from the JSON samples file is named sampleData as the argument
    dataPromise.then((sampleData) => {
        // console.log(sampleData);
        // let otu_ids = sampledata.samples[0].otu_ids;
        // console.log(otu_ids);
        // let sampleValues = sampledata.samples[0].sample_values;
        // console.log(sampleValues);
        // let otu_labels = sampledata.samples[0].otu_labels;
        // console.log (otu_labels);

// 2. Create a horizontal bar chart with a dropdown menu to display the top 10 OTUs found in that individual.
    // Use otu_ids as the labels for the bar chart.
    // Use otu_labels as the hovertext for the chart.
    // Use sample_values as the values for the bar chart.

        // get only top 10 otu ids for the plot OTU and reversing it. 
        let otu_ids = sampleData.samples[0].otu_ids.slice(0, 10).reverse();
        // get the otu id's to the desired form for the plot
        let otu_ids_f = otu_ids.map(d => "OTU-" + d + " ");
        console.log(`OTU-ids: ${otu_ids_f}`);
        // get the top 10 labels for the plot
        let otu_labels = sampleData.samples[0].otu_labels.slice(0,10);
        console.log(`OTU-labels: ${otu_labels}`);
        // get the top 10 sample values for the plot
        let sampleValues = sampleData.samples[0].sample_values.slice(0,10).reverse();
        console.log(sampleValues);

        let trace1 = {
            x: sampleValues,
            y: otu_ids_f,
            text: otu_labels,
            marker: {
            color: 'blue'},
            type:"bar",
            orientation: "h",
        };
        // create data variable
        let data = [trace1];

        // create layout variable to set plots layout
        let layout = {
            title: "Top 10 OTU",
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

        // create the bar plot
    Plotly.newPlot("bar", data, layout);
    //     // The bubble chart
    //     var trace1 = {
    //         x: sampledata.samples[0].otu_ids,
    //         y: sampledata.samples[0].sample_values,
    //         mode: "markers",
    //         marker: {
    //             size: sampledata.samples[0].sample_values,
    //             color: sampledata.samples[0].otu_ids
    //         },
    //         text:  sampledata.samples[0].otu_labels

    //     };

    //     // set the layout for the bubble plot
    //     var layout_2 = {
    //         xaxis:{title: "OTU ID"},
    //         height: 600,
    //         width: 1000
    //     };

    //     // creating data variable 
    //     var data1 = [trace1];

    // // create the bubble plot
    // Plotly.newPlot("bubble", data1, layout_2); 
    
    });
}

// 3. Create a bubble chart that displays each sample.

    // Use otu_ids for the x values.

    // Use sample_values for the y values.

    // Use sample_values for the marker size.

    // Use otu_ids for the marker colors.

    // Use otu_labels for the text values.

// 4. Display the sample metadata, i.e., an individual's demographic information.

// 5. Display each key-value pair from the metadata JSON object somewhere on the page.

// 6. Update all of the plots any time that a new sample is selected
//    create the function for the initial data rendering

function init() {
    // select dropdown menu 
    var dropdownMenu = d3.select("#selDataset");

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
        // getDemoInfo(searchData[0]);
    });
}
        
init();