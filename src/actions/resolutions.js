export function updateResolutions (resolutions, current) {
  if (JSON.stringify(current) !== JSON.stringify(resolutions)) {  
    return {
      type: 'REPLACE_RESOLUTION_ITEMS',
      resolutions,
    };
  } else {
    return {
      type: 'KEEP_RESOLUTION_ITEMS',
    };
  }

}