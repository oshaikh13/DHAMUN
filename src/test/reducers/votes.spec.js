import chai from 'chai'
import { votes } from 'reducers/votes'

var assert = chai.assert

describe("Votes Reducers:", function(){
	it("Should replace votes", function(){
		
		var action = {
			type : "REPLACE_VOTE_ITEMS",
			votes : {foo : "bar"} 
		}

		var expectedState = { items : {foo : "bar"}}

		var resultedState = votes({}, action)

		assert.equal(JSON.stringify(resultedState), JSON.stringify(expectedState))
	})

	it("Should keep votes the same", function(){

		var action = {
			type : "KEEP_VOTE_ITEMS",
			votes : {foo : "bar"}
		}

		var initialState = { items : { bar : "foo" }}

		var expectedState = { items : {foo : "bar"}}

		var resultedState = votes(initialState, action)

		assert.equal(JSON.stringify(initialState), JSON.stringify(resultedState))
	})

}) 