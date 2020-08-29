import { Schema, Document, Model, Types, model } from "mongoose";

const pointSchema = new Schema(
  {
    timestamp: Number,
    coords: {
      latitude: Number,
      longitude: Number,
      altitude: Number,
      accuracy: Number,
      heading: Number,
      speed: Number
    }
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
      }
    }
  }
);

interface TrackAttrs {
  userId: string;
  name: string;
  locations: {
    timestamp: number;
    coords: {
      latitude: number;
      longitude: number;
      altitude: number;
      accuracy: number;
      heading: number;
      speed: number;
    };
  };
}

interface TrackModel extends Model<TrackDocument> {
  build(attrs: TrackAttrs): TrackDocument;
}

interface TrackDocument extends Document {
  userId: string;
  name: string;
  locations: {
    timestamp: number;
    coords: {
      latitude: number;
      longitude: number;
      altitude: number;
      accuracy: number;
      heading: number;
      speed: number;
    };
  };
}

const trackSchema = new Schema<TrackDocument>(
  {
    userId: {
      type: Types.ObjectId,
      ref: "User"
    },
    name: {
      type: String,
      default: ""
    },
    locations: [pointSchema]
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
      }
    }
  }
);

trackSchema.statics.build = (attrs: TrackAttrs) => {
  return new Track(attrs);
};

export const Track = model<TrackDocument, TrackModel>("Track", trackSchema);
