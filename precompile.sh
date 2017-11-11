mkdir -p lib
mkdir -p temp
npx tsc
npx babel --presets es2015,stage-0,react -d lib/ temp/