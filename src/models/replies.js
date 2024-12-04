
const replySchema = new Schema(
    {
        reply: {
            type: String,
            max: 150,
            required: true,
        }, // String is shorthand for {type: String}


        user: {
            type: Schema.Types.ObjectId,
            ref: "Users"
        }


    },

    { timestamps: true }
);


const replies = mongoose.model("Replies", commentSchema);



export default replies

