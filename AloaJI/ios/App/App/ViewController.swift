import UIKit
import Capacitor

class ViewController: CAPBridgeViewController {
    override func viewDidLoad() {
        super.viewDidLoad()
        webView?.scrollView.minimumZoomScale = 1.0
        webView?.scrollView.maximumZoomScale = 1.0
        webView?.scrollView.bouncesZoom = false
    }

    override func viewDidLayoutSubviews() {
        super.viewDidLayoutSubviews()
        // Push WebView content below the status bar
        let statusBarHeight = view.window?.windowScene?.statusBarManager?.statusBarFrame.height ?? 0
        additionalSafeAreaInsets = UIEdgeInsets(top: statusBarHeight, left: 0, bottom: 0, right: 0)
    }
}
