/* Magic Mirror
 * Module: MMM-Canteen
 */

/* jshint esversion: 6 */

Module.register("MMM-Canteen", {

  defaults: {
    updateInterval: 10 * 60 * 1000,     //10 minutes
    canteen: 838,
    status: "employees",    //choose between ["employees", "students", "pupils", "others"]
    truncate: 100,
    switchTime: "16:00",
    debug: false
  },

  loading: true,
  closed: false,
  meals: [],

  start: function() {
    console.log("Starting module: " + this.name);
    this.sendSocketNotification("CONFIG", this.config);
  },

  getStyles: function() {
      return ["MMM-Canteen.css"];
  },


  getTemplate: function() {
    return "MMM-Canteen.njk";
  },


  getTemplateData: function() {
    this.log("Updating template data");
    return {
      config: this.config,
      loading: this.loading,
      meals: this.meals,
      closed: this.closed
    };
  },

  socketNotificationReceived: function(notification, payload) {
    Log.info("Socket Notification received: "+notification);
    this.loading = false;
    if (notification == "MEALS") {
      if (payload.length) {
        this.closed = false;
        this.meals = payload;
        this.log(this.meals);
      }
    } else if (notification == "CLOSED") {
      this.log("Mensa hat heut dicht!");
      this.closed = true;
    }
    this.updateDom(500);
  },


  log: function(msg) {
      if (this.config && this.config.debug) {
          Log.info(`${this.name}: ` + JSON.stringify(msg));
      }
  },

});
