const { User } = require("../models");
const { signToken } = require("../utils/auth");
const { AuthenticationError } = require("apollo-server-express");

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        return await User.findOne({ _id: context.user._id });
      }
      throw new AuthenticationError("No user found");
    },
  },

  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });
      if (!user) throw new AuthenticationError("No user found");

      const isCorrectPassword = await user.isCorrectPassword(password);

      if (!isCorrectPassword)
        throw new AuthenticationError("Incorrect Password");

      const token = signToken(user);
      return { token, user };
    },
    saveBook: async (parent, { bookInput }, context) => {
      if (context.user) {
        return await User.findOneAndUpdate(
          { _id: context.user._id },
          { $push: { savedBooks: bookInput } },
          { new: true }
        );
      }
      throw new AuthenticationError("Need to be logged in");
    },
    removeBook: async (parent, { bookInput }, context) => {
      if (context.user) {
        return await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { savedBooks: bookInput } },
          { new: true }
        );
      }
      throw new AuthenticationError("Need to be logged in");
    },
  },
};

module.exports = resolvers;
