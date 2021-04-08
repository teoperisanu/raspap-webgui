
<div class="tab-pane active" id="synchronageneral">
    <div class="row">
        <div class="col-md-8">
            <h2 class="mt-3"><?php echo _("Channel configuration"); ?></h2>

            <label for="code"><?php echo _("Channel"); ?></label>
            <div class="row">
                <div class="form-group col-md-6">
                    <select id="cbxchannelid" name="ChannelId" class="form-control" onclick="channelSelected()">-->
                        <option value="0"><?php echo _("None"); ?></option>
                        <option value="1"><?php echo _("Channel 1"); ?></option>
                        <option value="2"><?php echo _("Channel 2"); ?></option>
                        <option value="3"><?php echo _("Channel 3"); ?></option>
                        <option value="4"><?php echo _("Channel 4"); ?></option>
                        <option value="5"><?php echo _("Channel 5"); ?></option>
                        <option value="6"><?php echo _("Channel 6"); ?></option>
                        <option value="7"><?php echo _("Channel 7"); ?></option>
                        <option value="8"><?php echo _("Channel 8"); ?></option>
                        <option value="9"><?php echo _("Channel 9"); ?></option>
                        <option value="10"><?php echo _("Channel 10"); ?></option>
                        <option value="11"><?php echo _("Channel 11"); ?></option>
                        <option value="12"><?php echo _("Channel 12"); ?></option>
                        <option value="13"><?php echo _("Channel 13"); ?></option>
                        <option value="14"><?php echo _("Channel 14"); ?></option>
                        <option value="multiple"><?php echo _("Multiple channels"); ?></option>
                    </select>
                </div>
                <div class="form-group col-md-6">
                    <input type="text" class="form-control" id="txtmultiplechannels" name="MultipleChannelsTxt" style="visibility: hidden" placeholder="Example: 1,2,3"/>
                </div>
            </div>

            <div class="row">
                <div class="col-md-6 mb-2">
                    <div class="custom-control custom-switch">
                        <input class="custom-control-input" id="chkenable" type="checkbox" name="Enable" value="1" aria-describedby="enable-description" onchange="updateChannel()">
                        <label class="custom-control-label" for="chkenable"><?php echo _("Enable channel") ?></label>
                    </div>
                </div>
            </div>

            <div class="row">
                <div class="form-group col-md-6">
                    <label for="code"><?php echo _("Mode"); ?></label>
                    <input type="text" class="form-control" id="txtchmode" name="Mode" disabled="disabled"/>
                </div>
            </div>

            <div class="row">
                <div class="form-group col-md-6">
                    <label for="code"><?php echo _("Reference"); ?></label>
                    <select id="cbxreference" name="Reference" class="form-control" onchange="updateChannel()">
                        <option value="clk"><?php echo _("Clk"); ?></option>
                        <option value="sclk"><?php echo _("SClk"); ?></option>
                    </select>
                </div>
            </div>

            <label for="code"><?php echo _("Frequency"); ?></label>
            <div class="row">
                <div class="form-group col-md-6">
                    <input type="text" class="form-control" id="txtfrequency" name="Frequency" onchange="updateChannel()"/>
                </div>
                <div class="form-group col-md-3">
                    <select id="cbxfrequencyunits" name="FrequencyUnits" class="form-control" >
                        <option value="hz"><?php echo _("Hz"); ?></option>
                        <option value="khz"><?php echo _("KHz"); ?></option>
                        <option value="mhz"><?php echo _("MHz"); ?></option>
                        <option value="ghz"><?php echo _("GHz"); ?></option>
                    </select>
                </div>
            </div>

            <label for="code"><?php echo _("Slip"); ?></label>
            <div class="row">
                <div class="form-group col-md-6">
                    <input type="text" class="form-control" id="txtslip" name="Slip" onchange="updateChannel()"/>
                </div>
                <div class="form-group col-md-3">
                    <select id="cbxslipunitx" name="SlipUnitx" class="form-control" >-->
                        <option value="ps"><?php echo _("ps"); ?></option>
                    </select>
                </div>
            </div>

            <label for="code"><?php echo _("Digital Delay"); ?></label>
            <div class="row">
                <div class="form-group col-md-6">
                    <input type="text" class="form-control" id="txtdigitaldelay" name="DigitalDelay" onchange="updateChannel()"/>
                </div>
                <div class="form-group col-md-3">
                    <select id="cbxdigitaldelayunits" name="DigitalDelayUnits" class="form-control" >-->
                        <option value="ps"><?php echo _("ps"); ?></option>
                    </select>
                </div>
            </div>

            <label for="code"><?php echo _("Analogical Delay"); ?></label>
            <div class="row">
                <div class="form-group col-md-6">
                    <input type="text" class="form-control" id="txtanalogicaldelay" name="AnalogicalDelay" onchange="updateChannel()"/>
                </div>
                <div class="form-group col-md-3">
                    <select id="cbxanalogicaldelayunits" name="AnalogicalDelayUnits" class="form-control" >-->
                        <option value="ps"><?php echo _("ps"); ?></option>
                    </select>
                </div>
            </div>

        </div>
    </div><!-- /.row -->
</div><!-- /.tab-pane | general tab -->