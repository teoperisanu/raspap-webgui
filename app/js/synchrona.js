
const CHANNELS_NUMBER = 14;
const TWO_PORTS_CHANNELS_NUMBER = 10;

const ENABLE_COLOR = '#7d9c18';
const DISABLE_COLOR = '#f75f18';

const SELECT_STROKE = '0.7px'
const DESELECT_STROKE = '0px';

function handleErrors(response) {
    if (!response.ok) {
        throw Error(response.statusText);
    }
    return response;
}

function getChannelData(chId) {
    console.log(`Get channel ${chId}`);

    if (chId > CHANNELS_NUMBER) {
        return null;
    }

    const url = `http://127.0.0.1:8000/synchrona/channels/${chId}`;
    return fetch(url)
            .then(handleErrors)
            .then(response => {
                return response.json();
            }).catch(error => console.log(error));
}

function clearFields() {
    document.getElementById('cbxchannelid').value = '0';
    document.getElementById('chkenable').checked = false;
    document.getElementById('txtchmode').value = '';
    document.getElementById('cbxreference').value = 'clk';
    document.getElementById('txtfrequency').value = '';
    document.getElementById('txtslip').value = '';
    document.getElementById('txtdigitaldelay').value = '';
    document.getElementById('txtanalogicaldelay').value = '';
    document.getElementById('txtmultiplechannels').value = '';

    document.getElementById('cbxfrequencyunits').value = 'hz';
    document.getElementById('cbxslipunitx').value = 'ps';
    document.getElementById('cbxdigitaldelayunits').value = 'ps';
    document.getElementById('cbxanalogicaldelayunits').value = 'ps';
}

function initWindows() {
    document.getElementById('chkmultipleselection').checked = false;
    document.getElementById('btnselectallch').disabled = true;
    document.getElementById('btnselectnonech').disabled = true;
}

function updateChannelStates() {
    console.log("Update channels");

    for (let i = 1; i <= CHANNELS_NUMBER; i++) {
        getChannelData(i)
            .then(data => {
                if (data.enable === true) {
                    if (data.id <= TWO_PORTS_CHANNELS_NUMBER) {
                        document.getElementById(`channel_${data.id}_p`).style.fill = ENABLE_COLOR;
                        document.getElementById(`channel_${data.id}_n`).style.fill = ENABLE_COLOR;
                    } else if (data.id <= CHANNELS_NUMBER) {
                        document.getElementById(`channel_${data.id}`).style.fill = ENABLE_COLOR;
                    }
                } else {
                    if (data.id <= TWO_PORTS_CHANNELS_NUMBER) {
                        document.getElementById(`channel_${data.id}_p`).style.fill = DISABLE_COLOR;
                        document.getElementById(`channel_${data.id}_n`).style.fill = DISABLE_COLOR;
                    } else if (data.id <= CHANNELS_NUMBER) {
                        document.getElementById(`channel_${data.id}`).style.fill = DISABLE_COLOR;
                    }
                }
            })
    }
}

window.onload = function () {
    initWindows();
    clearFields();
    updateChannelStates();
    // setInterval(updateChannelStates, 5000);
}

function selectChannel(chId) {
    if (chId <= TWO_PORTS_CHANNELS_NUMBER) {
        document.getElementById(`select_area_channel_${chId}_p`).style.strokeWidth = SELECT_STROKE;
        document.getElementById(`select_area_channel_${chId}_n`).style.strokeWidth = SELECT_STROKE;
    } else if (chId <= CHANNELS_NUMBER) {
        document.getElementById(`select_area_channel_${chId}`).style.strokeWidth = SELECT_STROKE;
    }
}

function deselectChannel(chId) {
    if (chId <= TWO_PORTS_CHANNELS_NUMBER) {
        document.getElementById(`select_area_channel_${chId}_p`).style.strokeWidth = DESELECT_STROKE;
        document.getElementById(`select_area_channel_${chId}_n`).style.strokeWidth = DESELECT_STROKE;
    } else if (chId <= CHANNELS_NUMBER) {
        document.getElementById(`select_area_channel_${chId}`).style.strokeWidth = DESELECT_STROKE;
    }
}

function isChannelSelected(id) {
    return document.getElementById(id).style.strokeWidth !== DESELECT_STROKE;
}

function multipleSelectionClicked() {
    clearFields();

    if (document.getElementById('chkmultipleselection').checked) {
        document.getElementById('btnselectallch').disabled = false;
        document.getElementById('btnselectnonech').disabled = false;

        document.getElementById('cbxchannelid').value = 'multiple';
        document.getElementById('txtmultiplechannels').style.visibility = 'visible';
    } else {
        document.getElementById('btnselectallch').disabled = true;
        document.getElementById('btnselectnonech').disabled = true;

        document.getElementById('cbxchannelid').value = '0';
        document.getElementById('txtmultiplechannels').style.visibility = 'hidden';
    }
    for (let i = 1; i <= CHANNELS_NUMBER; i++) {
        deselectChannel(i);
    }
}


function fillChannelData(channelJson) {
    document.getElementById('chkenable').checked = channelJson.enable;
    document.getElementById('txtchmode').value = channelJson.mode.name;
    document.getElementById('cbxreference').value = channelJson.reference;
    document.getElementById('txtfrequency').value = channelJson.frequency;
    document.getElementById('txtslip').value = channelJson.slip;
    document.getElementById('txtdigitaldelay').value = channelJson.digital_delay;
    document.getElementById('txtanalogicaldelay').value = channelJson.analog_delay;
}

let previouslySelectedCh = 0;

function channelClicked(id) {
    const chId = parseInt(id.replace("select_area_channel_", ""));

    if (isChannelSelected(id)) {
        clearFields();
        deselectChannel(chId);
    } else {
        if (!document.getElementById('chkmultipleselection').checked) {
            if (previouslySelectedCh > 0) {
                deselectChannel(previouslySelectedCh);
            }
            getChannelData(chId)
                .then(data => {
                    fillChannelData(data);
                })
        }
            selectChannel(chId);
            document.getElementById('cbxchannelid').value = chId;
            previouslySelectedCh = chId;
    }
}

function channelSelected() {
    if (document.getElementById('cbxchannelid').value === 'multiple') {
        document.getElementById('chkmultipleselection').checked = true;
        document.getElementById('txtmultiplechannels').style.visibility = 'visible';
    } else {
        document.getElementById('chkmultipleselection').checked = false;
        document.getElementById('txtmultiplechannels').style.visibility = 'hidden';
        const chId = document.getElementById('cbxchannelid').value;
        if (chId > CHANNELS_NUMBER || chId < 1) {
            return;
        }
        if (chId <= TWO_PORTS_CHANNELS_NUMBER) {
            channelClicked(`select_area_channel_${chId}_p`);
        } else {
            channelClicked(`select_area_channel_${chId}`);
        }
    }
}

function updateChannel() {
    const chId = document.getElementById('cbxchannelid').value;
    // TODO validate id

    fetch(`http://127.0.0.1:8000/synchrona/channels/${chId}`, {
        method: 'PATCH',
        body: JSON.stringify({
            id: document.getElementById('cbxchannelid').value,
            enable: document.getElementById('chkenable').checked,
            reference: document.getElementById('cbxreference').value,
            frequency: document.getElementById('txtfrequency').value,
            slip: document.getElementById('txtslip').value,
            digital_delay: document.getElementById('txtdigitaldelay').value,
            analog_delay: document.getElementById('txtanalogicaldelay').value
        }),
        headers: {
            "Content-type": "application/json",
            Accept: 'application/json',
        }
    })
        .then(response => response.json())
        .then(json => console.info(`Update: ${JSON.stringify(json)}`));
}

function colapse() {
    if (document.getElementById("contentsynchrona").style.display === "block") {
        document.getElementById("contentsynchrona").style.display = "none";
        document.getElementById("btncollapse").value = "Maximize";

    } else {
        document.getElementById("contentsynchrona").style.display = "block";
        document.getElementById("btncollapse").value = "Minimize";

    }
    // var coll = document.getElementById("btncollapse");
    // var i;
    //
    // for (i = 0; i < coll.length; i++) {
    //     coll[i].addEventListener("click", function() {
    //         this.classList.toggle("active");
    //         var content = this.nextElementSibling;
    //         if (content.style.display === "block") {
    //             content.style.display = "none";
    //         } else {
    //             content.style.display = "block";
    //         }
    //     });
    // }
}