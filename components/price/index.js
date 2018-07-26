// 价格组件
Component({

  properties: {
    value: {
      type: [String, Number],
      value: '0',
      observer: function(newValue, oldValue){
        if (newValue == null) {
          newValue = 0;
        }
        let decimal = parseInt(this.data.decimal || 2);
        
        let isEqual = (parseInt(oldValue) / 100).toFixed(decimal) == newValue;
        
        newValue = newValue + '';
        if (!isEqual){
          let value = newValue || 0;
          value = parseInt(value);
          value = isNaN(value) ? 0 : value;
          if(value == 0){
            this.setData({
              value: decimal == 2 ? '0.00' : '0.0',
            });
          } else {
            this.setData({
              value: (value / 100).toFixed(decimal),
            });
          }
        } else if(newValue == '0'){
          this.setData({
            value: decimal == 2 ? '0.00' : '0.0',
          });
        }
      }
    },
    decimal: {
      type: [String, Number],
      default: 2,
    },
    noicon: {
      type: Boolean,
      default: false,
    },

    linethrough: {
      type: Boolean,
      value: false,
    }
  },

  data: {

  },

  methods: {

  },

  ready: function(){
    
  }
})
