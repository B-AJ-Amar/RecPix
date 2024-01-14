
const resolvers = {
    hello: () => {
      return 'world';
    },
    random:() =>{
      return Math.random();
    },
    rollDice:args =>{
      return [args.numSides,args.numDice]
    }
  };
  
  module.exports = resolvers;