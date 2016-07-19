import chai from 'chai'
import { resolutions } from 'reducers/resolutions'

var assert = chai.assert;

describe('Resolutions Reducers: ', function(){

	it("Should replace resolutions", function(){
		
		var action = {
			type : "REPLACE_RESOLUTION_ITEMS",
			resolutions : {foo : "bar"} 
		}

		var expectedState = { items : {foo : "bar"}}

		var resultedState = resolutions({}, action)

		assert.equal(JSON.stringify(resultedState), JSON.stringify(expectedState))
	})

  it("Should keep resolutions the same", function(){

    var action = {
      type : "KEEP_RESOLUTION_ITEMS",
      resolutions : {foo : "bar"}
    }

    var initialState = { items : { bar : "foo" }}

    var expectedState = { items : {foo : "bar"}}

    var resultedState = resolutions(initialState, action)

    assert.equal(JSON.stringify(initialState), JSON.stringify(resultedState))
  })

})
