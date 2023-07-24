export const WORK_DIR = "casper-node";
export const BIN_DIR = `bin`;
export const CONFIG_DIR = `config/1_0_0`;

export const nodeUrl = `https://s3.us-east-2.amazonaws.com/nctl.casperlabs.io/{GH_BRANCH}/casper-node`;
export const chainSpecTemplate = `https://raw.githubusercontent.com/casper-network/casper-node/{GH_BRANCH}/resources/local/chainspec.toml.in`;
export const configFile = `https://raw.githubusercontent.com/casper-network/casper-node/{GH_BRANCH}/resources/local/config.toml`;
export const githubTag = `https://api.github.com/repos/casper-network/casper-node/tags`;

export const FUNDED_KEYS = [
  {
    private: "MC4CAQAwBQYDK2VwBCIEII8ULlk1CJ12ZQ+bScjBt/IxMAZNggClWqK56D1/7CbI",
    public:
      "01aff5c18a954604dd27d139d8e0cfc533ac3d53784d76c7a7ac5ff4039510fdf6",
  },
  {
    private: "MC4CAQAwBQYDK2VwBCIEIJTD9IlUYzuMHbvAiFel/uqd6V7vUtUD19IEQlo6SAFC",
    public:
      "01868e06026ba9c8695f6f3bb10d44782004dbc144ff65017cf484436f9cf7b0f6",
  },
  {
    private: "MC4CAQAwBQYDK2VwBCIEILMuHWPyN8puln9EVgsoVidgHW7V+eSKWorDLOABQnz4",
    public:
      "01bfe707f56b46172965fd9e557d32582e5daf677b786bc44c5a584a5956962cea",
  },
  {
    private: "MC4CAQAwBQYDK2VwBCIEIBYTk4Pc0Q6F3okf21hVWWJoGzQhuY86aRXjwdO1kYBK",
    public:
      "011540c4793aaae429ba1c4234d28f81602f8ea9a6ee2faca0841064b1c00777aa",
  },
  {
    private: "MC4CAQAwBQYDK2VwBCIEIEMDli6ushtAEMO5CHXFZ6Xu5gIPMovaj3xP8BanvbpY",
    public:
      "016a3a03bab96a55bb647b7842442f10592c5af34b390edcb553efe77dd1939618",
  },
  {
    private: "MC4CAQAwBQYDK2VwBCIEINP9cvD7XpQWxlf78ajbnRWtvLdhOkgVbezJ9e8Iksce",
    public:
      "015eb415d5318bbee886442b2915ada3106ee99adf837f27130e248855ff435d89",
  },
  {
    private: "MC4CAQAwBQYDK2VwBCIEIOeKQNbCmsyZme2t5U7Lulnn2TfdZkiFANeg89Sy7Pzn",
    public:
      "01fbe77037c317c12af3a6af08d02d9fc6b3a1636237ae48f77b198a9483d94801",
  },
  {
    private: "MC4CAQAwBQYDK2VwBCIEIPZsIcOa1F3PpF8SoOjIaJ1qIrsraqj2APBA1pZV0N+R",
    public:
      "016fd7fb5f002d82f3813c76ac83940d4d886035395ddd9be66c9a4a2993b63aaf",
  },
  {
    private: "MC4CAQAwBQYDK2VwBCIEID09aO41hXnqc40TvF5vJlId/ClRc4k5Nvkt+1Nt8Nsm",
    public:
      "0143635bc96d6d4b8fa8bdbd6adfcbc3d27cfd3c05d12a912581199a4f8a5a1d0c",
  },
  {
    private: "MC4CAQAwBQYDK2VwBCIEIM/9zrwbWH41okTYiTOPMhxZ/C3/YZHzEuTc+gHJKsZf",
    public:
      "013bf82b19cec318a992dee5c3956bb7252a4f3f65887fe1221128b6c48f68334a",
  },
];

export const NETWORK_NAMES = [
  "casper",
  "casper-test",
  "casper-net-1",
  "casper-example",
];
