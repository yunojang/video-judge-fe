interface WebrtcConfig extends RTCConfiguration {
  remoteUrl: string;
  offerToReceiveVideo?: boolean;
  offerToReceiveAudio?: boolean;
}

const STUN_SERVERS = [
  {
    urls: [
      'stun:stun.l.google.com:19302',
      'stun:stun1.l.google.com:19302',
      'stun:stun2.l.google.com:19302',
      'stun:stun3.l.google.com:19302',
      'stun:stun4.l.google.com:19302',
    ],
  },
];

class Webrtc {
  remoteUrl: string;
  pc: RTCPeerConnection;
  config: RTCConfiguration;
  offerToReceiveVideo: boolean;
  offerToReceiveAudio: boolean;

  constructor({
    remoteUrl,
    offerToReceiveVideo = true,
    offerToReceiveAudio = false,
    iceServers = STUN_SERVERS,
    ...rest
  }: WebrtcConfig) {
    const pc = new RTCPeerConnection({ iceServers, ...rest });

    this.pc = pc;
    this.config = { iceServers, ...rest };
    this.remoteUrl = remoteUrl;
    this.offerToReceiveVideo = offerToReceiveVideo;
    this.offerToReceiveAudio = offerToReceiveAudio;
  }

  createPeerConnection = () => {
    this.pc = new RTCPeerConnection(this.config);
  };

  negotiate = async (payload?: object) => {
    this.createPeerConnection();

    const { offerToReceiveAudio, offerToReceiveVideo } = this;
    return this.pc
      .createOffer({ offerToReceiveAudio, offerToReceiveVideo })
      .then(offer => this.pc.setLocalDescription(offer))
      .then(() => {
        return new Promise<void>(resolve => {
          if (this.pc.iceGatheringState === 'complete') {
            resolve();
          } else {
            const checkState = () => {
              if (this.pc.iceGatheringState === 'complete') {
                this.pc.removeEventListener(
                  'icegatheringstatechange',
                  checkState,
                );
                resolve();
              }
            };
            this.pc.addEventListener('icegatheringstatechange', checkState);
          }
        });
      })
      .then(() => {
        const offer = this.pc.localDescription;
        const body = { sdp: offer?.sdp, type: offer?.type, ...payload };

        return fetch(this.remoteUrl, {
          body: JSON.stringify(body),
          headers: {
            'Conetent-Type': 'application/json',
          },
          method: 'POST',
        })
          .then(response => response.json())
          .then(answer => this.pc.setRemoteDescription(answer));
      });

    // wait iceGatheringState complete
    // await new Promise<void>(resolve => {
    //   if (this.pc.iceGatheringState !== 'complete') {
    //     const checkState = () => {
    //       if (this.pc.iceGatheringState === 'complete') {
    //         resolve();
    //         this.pc.removeEventListener('icegatheringstatechange', checkState);
    //       }
    //     };
    //     this.pc.addEventListener('icegatheringstatechange', checkState);
    //   }
    // });

    // const remoteSdp = await this.sendOffer(offer, payload);
    // return this.pc.setRemoteDescription(remoteSdp);
  };

  // createOffer = async (options?: RTCOfferOptions) => {
  //   const offer = await this.pc.createOffer(options);
  //   this.pc.setLocalDescription(offer);

  //   return offer;
  // };

  // sendOffer = async (offer: RTCSessionDescriptionInit, body?: object) => {
  //   const _body = { sdp: offer.sdp, type: offer.type, ...body };

  //   // loading = true;
  //   const response = await fetch(this.remoteUrl, {
  //     body: JSON.stringify(_body),
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     method: 'POST',
  //   });
  //   const result = await response.json();
  //   // loading = false;

  //   return result;
  // };

  stop = () => {
    // if (this.dc) {
    //   this.dc.close();
    // }
    this.pc.getTransceivers().forEach(transceiver => transceiver.stop());
    this.pc.getSenders().forEach(sender => sender.track?.stop());

    setTimeout(() => {
      this.pc.close();
    }, 500);
  };
}

export default Webrtc;
