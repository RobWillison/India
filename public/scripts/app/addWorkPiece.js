Vue.component('workitem', {

	props: ['item'],

	template: "#workitem",
});

Vue.component('editmodal', {
  template: '#editmodal',
  props: ['item']
});

var vue = new Vue({

	el:'#app',

	data: {
		workPieces: []
	},

	created: function () {
	    this.fetchData()
	},

	methods: {

		fetchData: function () {
				$.ajax({
				dataType: "json",
				url: '/work',
				context: this,
				success: function (data) {
							this.workPieces = data;
              this.showModal = false;
					}
				});
	    }
	}
})
