/**!
 * Google Drive File Picker Example
 * By Daniel Lo Nigro (http://dan.cx/)
 * Edited to work with Drive v3 by Omar :p
 */

var initFilePicker = function() {
  console.log("INIT GAPI");
  window.FilePicker = function(options) {
    // Config
    console.log("IVE BEEN PICKED");
    this.apiKey = options.apiKey;
    this.clientId = options.clientId;
    this.appId = options.appId;
    
    // Elements
    this.buttonEl = options.buttonEl;
    
    // Events
    this.onSelect = options.onSelect;
    this.buttonEl.addEventListener('click', this.open.bind(this));    
  
    // Disable the button until the API loads, as it won't work properly until then.
    this.buttonEl.disabled = true;

    // Load the drive API
    gapi.client.load('drive', 'v3', this._driveApiLoaded(this));
    gapi.load('picker', {'callback': this._pickerApiLoaded(this)});
  }

  FilePicker.prototype = {
    /**
     * Open the file picker.
     */
    open: function() {    
      // Check if the user has already authenticated
      console.log("OPENED");
      var token = gapi.auth.getToken();
      if (token) {
        this._showPicker();
      } else {
        // The user has not yet authenticated with Google
        // We need to do the authentication before displaying the Drive picker.
        this._doAuth(false, function() { this._showPicker(); }.bind(this));
      }
    },
    
    /**
     * Show the file picker once authentication has been done.
     * @private
     */
    _showPicker: function() {
      var accessToken = gapi.auth.getToken().access_token;
      this.picker = new google.picker.PickerBuilder().
        addView(google.picker.ViewId.DOCUMENTS).
        setAppId(this.appId).
        setDeveloperKey(this.apiKey).
        setOAuthToken(accessToken).
        setCallback(this._pickerCallback.bind(this)).
        build().
        setVisible(true);
    },
    
    /**
     * Called when a file has been selected in the Google Drive file picker.
     * @private
     */
    _pickerCallback: function(data) {
      if (data[google.picker.Response.ACTION] == google.picker.Action.PICKED) {
        var file = data[google.picker.Response.DOCUMENTS][0],
          id = file[google.picker.Document.ID],
          request = gapi.client.drive.files.get({
            fileId: id
          });
          
        request.execute(this._fileGetCallback.bind(this));
      }
    },
    /**
     * Called when file details have been retrieved from Google Drive.
     * @private
     */
    _fileGetCallback: function(file) {
      if (this.onSelect) {
        this.onSelect(file);
      }
    },
    
    /**
     * Called when the Google Drive file picker API has finished loading.
     * @private
     */
    _pickerApiLoaded: function() {
      this.buttonEl.disabled = false;
    },
    
    /**
     * Called when the Google Drive API has finished loading.
     * @private
     */
    _driveApiLoaded: function() {
      debugger;
      this._doAuth(true);
    },
    
    /**
     * Authenticate with Google Drive via the Google JavaScript API.
     * @private
     */
    _doAuth: function(immediate, callback) {
      debugger;  
      window.gapi.auth.authorize({
        client_id: this.clientId,
        scope: 'https://www.googleapis.com/auth/drive.readonly',
        immediate: immediate
      }, callback);
    }
  };
}

module.exports = initFilePicker;

