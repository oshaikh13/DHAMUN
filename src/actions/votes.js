export function updateVotes (votes, current) {

  if (JSON.stringify(current) !== JSON.stringify(votes)) {  
    return {
      type: 'REPLACE_ITEMS',
      votes,
    };
  } else {
    return {
      type: 'KEEP_ITEMS',
    };
  }

}